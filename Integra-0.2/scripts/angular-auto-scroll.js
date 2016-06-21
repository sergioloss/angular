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
          var parent = angular.element(el).parent();
            console.log('elem: ' + elem.tagName);
            console.log('parent: ' + parent.tagName);
          //var $scrollTo = $(el).find(scrollTo);
          var $scrollTo = elem.getElementsByClassName(scrollTo);

          console.log('$scrollTo.length = ' + $scrollTo.length);
          if($scrollTo.length){
            //$(el).scrollTop(0).scrollTop($scrollTo.offset().top - $(el).offset().top - offsetTop);  
              console.log('el.parent() = ' + el.parent().tagName)
            el.parent().scrollTo = 7; //($scrollTo.offset().top - elem.offset().top - offsetTop);  
          }
        });
      })
    }
  }
});