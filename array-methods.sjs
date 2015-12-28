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
        for (var i = 0; i < $array.length; i++) {
          if ($callback($array[i], i, $array)) {
            ret.push($array[i]);
          }
        }
        return ret;
      })();
  }
  rule { ($array, $callback:ident, $scope) } => {
    (function() {
        var ret = new Array();
        for (var i = 0; i < $array.length; i++) {
          if ($callback.call($scope, $array[i], i, $array)) {
            ret.push($array[i]);
          }
        }
        return ret;
    })();
  }
  
  rule { ($array, $callback:expr) } => {
      (function() {
        var ret = new Array();
        for (var i = 0; i < $array.length; i++) {
          if ($callback($array[i], i, $array)) {
            ret.push($array[i]);
          }
        }
        return ret;
      })();
  }
  
  rule { ($array, $callback:expr, $scope) } => {
    (function() {
        var ret = new Array();
        for (var i = 0; i < $array.length; i++) {
          if ($callback.call($scope, $array[i], i, $array)) {
            ret.push($array[i]);
          }
        }
        return ret;
    })();
  }
}

macro map {
  rule { ($array, $callback:ident) } => {
      (function() {
        var ret = new Array($array.length);
        for (var i = 0; i < $array.length; i++) {
          ret[i] = $callback($array[i], i, $array);
        }return ret;
      })();
  }
  rule { ($array, $callback:ident, $scope) } => {
    (function() {
        var ret = new Array($array.length);
        for (var i = 0; i < $array.length; i++) {
          ret[i] = $callback.call($scope, $array[i], i, $array);
        }
        return ret;
    })();
  }
  
  rule { ($array, $callback:expr) } => {
    (function() {
        var ret = new Array($array.length);
        for (var i = 0; i < $array.length; i++) {
          ret[i] = $callback($array[i], i, $array);
        }
        return ret;
    })();
  }
  
  rule { ($array, $callback:expr, $scope) } => {
    (function() {
        var ret = new Array($array.length);
        for (var i = 0; i < $array.length; i++) {
          ret[i] = $callback.call($scope, $array[i], i, $array);
        }
        return ret;
    })();
  }
}

macro map {
  rule { ($array, $callback:ident, init) } => {
      (function() {
        var ret = new Array($array.length);
        for (var i = 0; i < $array.length; i++) {
          ret[i] = $callback($array[i], i, $array);
        }return ret;
      })();
  }
  rule { ($array, $callback:ident, $scope) } => {
    (function() {
        var ret = new Array($array.length);
        for (var i = 0; i < $array.length; i++) {
          ret[i] = $callback.call($scope, $array[i], i, $array);
        }
        return ret;
    })();
  }
  
  rule { ($array, $callback:expr) } => {
    (function() {
        var ret = new Array($array.length);
        for (var i = 0; i < $array.length; i++) {
          ret[i] = $callback($array[i], i, $array);
        }
        return ret;
    })();
  }
  
  rule { ($array, $callback:expr, $scope) } => {
    (function() {
        var ret = new Array($array.length);
        for (var i = 0; i < $array.length; i++) {
          ret[i] = $callback.call($scope, $array[i], i, $array);
        }
        return ret;
    })();
  }
}

exports.forEach = forEach;
exports.map = map;
exports.filter = filter;