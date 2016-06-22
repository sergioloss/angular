angular.module('auto-scroll', []).directive('autoScroll', function($timeout, $location, $anchorScroll) {
    return {
        restrict: 'A',
        scope: {
            autoScrollOptions: '=autoScroll'
        },
        link: function($scope, element, attributes, $index) {
            var watch = $scope.autoScrollOptions.watch;
            var scrollToSelectedClassName = $scope.autoScrollOptions.scrollToSelectedClassName;
            
            var el = angular.element(element)[0];
            var scrollPosition = 0;
            var selectedScrollPosition = 0;
            
            //console.log('oooooooo');
            $scope.$parent.$watch(watch, function(newValue, oldValue) {
            
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
                    console.log('h = ' + h)
                    scrollPosition = h;
                }

                if (oldValue == '' && newValue != '') {   
                    // scrollPosition = el.scrollTop;
                };

                if (newValue == '') {
                    el.scrollTop = scrollPosition;     
                    //el.animate({scrollTop: 200}, "slow");
                }
                
            })
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