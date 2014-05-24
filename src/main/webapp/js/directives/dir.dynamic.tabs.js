'use strict';

IndexModule.directive('dynamicTabs', function () {
        return {
            restrict: 'A',
            require: '?ngModel',
            template: '\
            <ul class="nav nav-tabs">\
                <li ng-class="{active: item.active}" ng-repeat="item in tabsData"><a ng-click="toggleActive($index,true)"  ng-mouseover="showTooltip(item,$event)">{{item.module_name}}</a></li>\
            </ul>\
            <div class="tab-content">\
              <div class="tab-pane" ng-class="{active: item.active}" id="{{contentBaseId}}-{{$index}}" ng-repeat="item in tabsData">\
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
                        scope.setThisQuestion(scope.tabsData[ind].start_number);
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