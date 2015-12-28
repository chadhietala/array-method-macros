macro forEach {
  rule { ($array, $callback:ident) } => {
    for (var i = 0; i < $array.length; i++) {
      $callback($array[i], i, $array);
    }
  }
  rule { ($array, $callback:ident, $scope) } => {
    for (var i = 0; i < $array.length; i++) {
      $callback.call($scope, $array[i], i, $array);
    }
  }
  
  rule { ($array, $callback:expr) } => {
    for (var i = 0; i < $array.length; i++) {
      $callback($array[i], i, $array);
    }
  }
  
  rule { ($array, $callback:expr, $scope) } => {
    for (var i = 0; i < $array.length; i++) {
      $callback.call($scope, $array[i], i, $array);
    }
  }
}

macro filter {
  rule { ($array, $callback:ident) } => {
    (function() {
      var ret = new Array();

      forEach($array, function(item, i) {
        if ($callback(item, i, $array)) {
          ret.push(item);
        }
      });

      return ret;
    })();
  }
  rule { ($array, $callback:ident, $scope) } => {
    (function() {
        var ret = new Array();

        forEach($array, function(item, i) {
          if ($callback.call($scope, item, i, $array)) {
            ret.push(item);
          }
        });

        return ret;
    })();
  }
  
  rule { ($array, $callback:expr) } => {
    (function() {
      var ret = new Array();

      forEach($array, function(item, i) {
        if ($callback(item, i, $array)) {
          ret.push(item);
        }
      });

      return ret;
    })();
  }
  
  rule { ($array, $callback:expr, $scope) } => {
    (function() {
      var ret = new Array();

      forEach($array, function(item, i) {
        if ($callback.call($scope, item, i, $array)) {
          ret.push(item);
        }
      });

      return ret;
    })();
  }
}

macro map {
  rule { ($array, $callback:ident) } => {
    (function() {
      var ret = new Array($array.length);

      forEach($array, function(item, i) {
        ret[i] = $callback(item, i, $array);
      });
      
      return ret;
    })();
  }
  rule { ($array, $callback:ident, $scope) } => {
    (function() {
      var ret = new Array($array.length);
      
      forEach($array, function(item, i) {
        ret[i] = $callback.call($scope, item, i, $array);
      });

      return ret;
    })();
  }
  
  rule { ($array, $callback:expr) } => {
    (function() {
      var ret = new Array($array.length);

      forEach($array, function(item, i) {
        ret[i] = $callback(item, i, $array);
      });      

      return ret;
    })();
  }
  
  rule { ($array, $callback:expr, $scope) } => {
    (function() {
      var ret = new Array($array.length);
      
      forEach($array, function(item, i) {
        ret[i] = $callback.call($scope, item, i, $array);
      });

      return ret;
    })();
  }
}

macro reduce {
  rule { ($array, $combine:ident, init) } => {
    (function() {
      var ret = $init;
      // TODO
      // More checks here
      forEach($array, function(item, i, array) {
        ret = $combine(ret, item);
      });
      return ret;
    })();
  }
  rule { ($array, $combine:ident, init, $scope) } => {
    (function() {
      var ret = $init;
      // TODO
      // More checks here
      forEach($array, function(item, i, array) {
        ret = $combine.call($scope, ret, item);
      });
      return ret;
    })();
  }
  
  rule { ($array, $combine:expr) } => {
    (function() {
      var ret = $init;
      // TODO
      // More checks here
      forEach($array, function(item, i, array) {
        ret = $combine(ret, item);
      });
      return ret;
    })();
  }
  
  rule { ($array, $combine:expr, $scope) } => {
    (function() {
      var ret = $init;
      // TODO
      // More checks here
      forEach($array, function(item, i, array) {
        ret = $combine.call($scope, ret, item);
      });
      return ret;
    })();
  }
}

exports.forEach = forEach;
exports.map = map;
exports.filter = filter;
exports.reduce = reduce;