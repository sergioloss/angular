angular.module('auto-scroll', []).directive('autoScroll', function($timeout, $location, $anchorScroll) {
    return {
        restrict: 'A',
        scope: {
            autoScrollOptions: '=autoScroll'
        },
        link: function($scope, element, attributes, $index) {
            var watch = $scope.autoScrollOptions.watch;
            var reset = $scope.autoScrollOptions.reset;
            var scrollToSelectedClassName = $scope.autoScrollOptions.scrollToSelectedClassName;
            
            var el = angular.element(element)[0];
            var scrollPosition = 0;
            //var scrollPosition = getScrollPosition();
            var selectedScrollPosition = 0;
            
            var animateCrollDuration = 250; // milliseconds: 1000 = 1s
            
            //console.log('oooooooo');
            $scope.$parent.$watch(watch, function(newValue, oldValue) {
            
                //console.log('watch = ' + newValue);
                scrollTo(el, 0, animateCrollDuration);
                
                scrollPosition = getScrollPosition();
                /*
                var $scrollTo = el.getElementsByClassName(scrollToSelectedClassName);
                if ($scrollTo.length)
                {
                    var childs = el.getElementsByTagName('md-list-item')
                    var h = 0;

                    if (childs.length) {
                        for (i = 0; i < childs.length; i++) {
                            if (childs[i].attributes['class'].value.indexOf(scrollToSelectedClassName) > -1) {
                                break;
                            }
                            h += childs[i].clientHeight;
                        }                    
                    };
                    //console.log('h = ' + h)
                    scrollPosition = h;
                }
                */

                if (!newValue) {
                    //el.scrollTop = scrollPosition;     
                    scrollTo(el, scrollPosition, animateCrollDuration);
                }
                
            })
            
            $scope.$parent.$watch(reset, function(newValue, oldValue) {
                
                scrollPosition = getScrollPosition();
                /*
                var $scrollTo = el.getElementsByClassName(scrollToSelectedClassName);
                if ($scrollTo.length)
                {
                    var childs = el.getElementsByTagName('md-list-item')
                    var h = 0;

                    if (childs.length) {
                        for (i = 0; i < childs.length; i++) {
                            if (childs[i].attributes['class'].value.indexOf(scrollToSelectedClassName) > -1) {
                                break;
                            }
                            h += childs[i].clientHeight;
                        }                    
                    };
                    //console.log('h = ' + h)
                    scrollPosition = h;
                }
                */
                
                if (newValue != oldValue) {
                    if (newValue < 1) {
                        scrollTo(el, 0, animateCrollDuration);
                    } else {
                        scrollTo(el, scrollPosition, animateCrollDuration);
                    }                    
                }
            })
            
            function getScrollPosition() {
                var index = $scope.$parent.scrollToIndex;
                console.log('$scope.$parent.scrollToIndex = ' + $scope.$parent.scrollToIndex);
                var scrollPosition = 0;
                var childs = el.getElementsByTagName('md-list-item')
                var h = 0;
                var i = 0

                if (childs.length) {
                    for (i = 0; i < childs.length; i++) {
                        if (childs[i].attributes['index'].value == index) {
                            break;
                        }
                        h += childs[i].clientHeight;
                    }                    
                };
                //console.log('i = ' + i + ' - ' + new Date().getTime());
                scrollPosition = h;
                return scrollPosition;
            };
            
            function getScrollPosition_OLD() {
                var scrollPosition = 0;
                var $scrollTo = el.getElementsByClassName(scrollToSelectedClassName);
                if ($scrollTo.length)
                {
                    var childs = el.getElementsByTagName('md-list-item')
                    var h = 0;
                    var i = 0

                    if (childs.length) {
                        for (i = 0; i < childs.length; i++) {
                            if (childs[i].attributes['class'].value.indexOf(scrollToSelectedClassName) > -1) {
                                break;
                            }
                            h += childs[i].clientHeight;
                        }                    
                    };
                    //console.log('i = ' + i + ' - ' + new Date().getTime());
                    scrollPosition = h;
                }
                return scrollPosition;
            }
            
            function scrollTo(element, scrolPositionTo, scrollDuration) {
                if (scrollDuration <= 0) return;
                var difference = scrolPositionTo - element.scrollTop;
                var perTick = difference / scrollDuration * 10;

                setTimeout(function() {
                    element.scrollTop = element.scrollTop + perTick;
                    if (element.scrollTop === scrolPositionTo) return;
                    scrollTo(element, scrolPositionTo, scrollDuration - 10);
                }, 10);
            }

        }
        
    }
});

/*
app.directive('scrollIf', function () {
    
    var getScrollingParent = function(element) {
        element = element.parentElement;
        while (element) {
            if (element.scrollHeight !== element.clientHeight) {
                return element;
            }
            element = element.parentElement;
        }
        return null;
    };
    
    return function (scope, element, attrs) {
        scope.$watch(attrs.scrollIf, function(value) {
            if (value) {
                var sp = getScrollingParent(element[0]);
                var topMargin = parseInt(attrs.scrollMarginTop) || 0;
                var bottomMargin = parseInt(attrs.scrollMarginBottom) || 0;
                var elemOffset = element[0].offsetTop;
                var elemHeight = element[0].clientHeight;

                if (elemOffset - topMargin < sp.scrollTop) {
                    sp.scrollTop = elemOffset - topMargin;
                } else if (elemOffset + elemHeight + bottomMargin > sp.scrollTop + sp.clientHeight) {
                    sp.scrollTop = elemOffset + elemHeight + bottomMargin - sp.clientHeight;
                }
            }
        });
    }
    
});
*/