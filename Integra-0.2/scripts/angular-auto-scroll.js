angular.module('auto-scroll', []).directive('autoScroll', function($timeout) {
  return {
    restrict: 'A',
    scope: {
      autoScrollOptions: '=autoScroll'
    },
    link: function($scope, el) {
      var offsetTop = $scope.autoScrollOptions.offsetTop ? $scope.autoScrollOptions.offsetTop : 0;
      var scrollTo = $scope.autoScrollOptions.scrollTo;
      var watch = $scope.autoScrollOptions.watch;

      $scope.$parent.$watch(watch, function() {
        $timeout(function () {
          var elem = angular.element(el)[0];
          var child = el.children(':first')[0];
          //var $scrollTo = $(el).find(scrollTo);
          var $scrollTo = elem.getElementsByClassName(scrollTo);

          if($scrollTo.length){
            //$(el).scrollTop(0).scrollTop($scrollTo.offset().top - $(el).offset().top - offsetTop);  
              console.log('$scrollTo[0].scrollTop = ' + $scrollTo[0].getBoundingClientRect().top);
            elem.scrollTop = $scrollTo.scrollTop; //700; //($scrollTo.offset().top - elem.offset().top - offsetTop);  
          }
        });
      })
    }
  }
});

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