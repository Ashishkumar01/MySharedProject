'use strict';

IndexModule.directive('dynamicTabs', function () {
        return {
            restrict: 'A',
            require: '?ngModel',
            template: '\
            <ul class="nav nav-tabs" role="tablist">\
                    <li ng-class="{active: item.active}" ng-repeat="item in tabsData"><a ng-click="toggleActive($index,true)" >{{item.subject}}</a></li>\
                      <li class="dropdown">\
        <a href="http://getbootstrap.com/javascript/#" id="myTabDrop1" class="dropdown-toggle" data-toggle="dropdown">Dropdown <span class="caret"></span></a>\
        <ul class="dropdown-menu" role="menu" aria-labelledby="myTabDrop1">\
        <li class="" ng-repeat="item in tabsData"><a href="http://getbootstrap.com/javascript/#dropdown{{$index}}" tabindex="-1" role="tab" data-toggle="tab"  >{{item.subject}}</a></li>\
        </ul>\
        </li>\
    </ul>\
            <div class="tab-content">\
              <div class="tab-pane nonDropdownDiv " ng-class="{active: item.active}" id="{{contentBaseId}}-{{$index}}" ng-repeat="item in tabsData">\
              <br/>\
                                <div class="col-md-6" ng-show="currentQuestion.direction">\
                                    <p ng-bind-html="renderHtml(currentQuestion.direction)"></p>\
                                </div>\
                                <div class="col-md-6">\
                                    <p><b>Q {{currentQuestionNumber+1}}</b> {{currentQuestion.statement}}</p>\
                                    <ul class="nav">\
                                        <li ng-repeat="currentOption in currentQuestion.options">\
                                            <input type="radio" ng-model="currentQuestion.user_selected_option" ng-value="$index"\
                                            value="{{$index}}" ng-click="currentQuestion.user_selected_option=$index"/>\
                                            <label>{{currentOption}}</label>\
                                        </li>\
                                    </ul>\
                                </div>\
              </div>\
              <div class="tab-pane dropdownDiv" ng-class="{active: item.active}" id="dropdown{{$index}}" ng-repeat="item in tabsData">\
              <div>Mobile ready</div>\
              <br/>\
                                <div class="col-md-6" ng-show="currentQuestion.direction">\
                                    <p ng-bind-html="renderHtml(currentQuestion.direction)"></p>\
                                </div>\
                                <div class="col-md-6">\
                                    <p><b>Q {{currentQuestionNumber+1}}</b> {{currentQuestion.statement}}</p>\
                                    <ul class="nav">\
                                        <li ng-repeat="currentOption in currentQuestion.options">\
                                            <input type="radio" ng-model="currentQuestion.user_selected_option" ng-value="$index"\
                                            value="{{$index}}" ng-click="currentQuestion.user_selected_option=$index"/>\
                                            <label>{{currentOption}}</label>\
                                        </li>\
                                    </ul>\
                                </div>\
              </div>\
            </div>',
            link: function(scope, el, attrs){
                scope.contentBaseId = attrs.tabsBaseId;

                scope.toggleActive = function(ind,tabClicked){
                    angular.forEach(scope.tabsData, function(value, key){
                        if (key == ind)
                        {
                            if(ind!=scope.currentActiveTab){
                                scope.tabsData[key].active = !scope.tabsData[key].active;
                                $("#" + scope.panelBaseId + "-" + ind).tab('show');
                                scope.currentActiveTab=ind;
                            }
                        }
                        else
                            scope.tabsData[key].active = false;
                    });

                    //set the question number for this tab
                    if(tabClicked){
                        scope.setThisQuestion(scope.tabsData[ind].startIndex);
                    }
                },

                scope.showTooltip = function(item,event){
                    $(event.target).qtip({
                        content:'test tooltip',
                        show:{
                            ready:true
                        },
                        position:{
                            target:'mouse',
                            adjust:{mouse:false},
                            viewport: $(window)
                        },
                        hide:{
                            distance:200,
                            delay:100,
                            event:'mouseout',
                            fixed:true
                        },
                        onHide:function(){
                            $(this).qtip('destroy');
                        }
                    });
                };
            }
        };
    });