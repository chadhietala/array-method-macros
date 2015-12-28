macro loop {
  rule { ($array, $callback) } => {
    for (var i = 0; i < $array.length; i++) {
      $callback($array[i], i, $array);
    }
  }
}

macro reverseLoop {
  rule { ($array, $callback:expr) } => {
    var i = $array.length;
    while(i--) {
      $callback($array[i], i, $array);
    }
  }
}

macro forEach {
  rule { ($array, $callback:ident) } => {
    loop($array, $callback);
  }
  
  rule { ($array, $callback:expr) } => {
    loop($array, $callback);
  }
  
  rule { ($array, $callback:ident, $scope) } => {
    loop($array, $callback.bind($scope));
  }
  
  rule { ($array, $callback:expr, $scope) } => {
    loop($array, $callback.bind($scope));
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

macro reduceRight {
  rule { ($array, $combine:ident, init) } => {
    (function() {
      var ret = $init;
      // TODO
      // More checks here
      reverseLoop($array, function(item, i, array) {
        ret = $combine(ret, item);
      });

      return ret;
    })();
  }
  
  rule { ($array, $combine:expr, init) } => {
    (function() {
      var ret = $init;
      // TODO
      // More checks here
      reverseLoop($array, function(item, i, array) {
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
      reverseLoop($array, function(item, i, array) {
        ret = $combine.call($scope, ret, item);
      });

      return ret;
    })();
  }
  
  rule { ($array, $combine:expr, $scope) } => {
    (function() {
      var ret = $init;
      // TODO
      // More checks here
      reverseLoop($array, function(item, i, array) {
        ret = $combine.call($scope, ret, item);
      });
      return ret;
    })();
  }
}

macro every {
  rule { ($array, $test:ident) } => {
    for (var i = 0; i < $array.length; i++) {
      if (!$test($array[i], i, $array)) {
        return false;
      }   
    }
    
    return true;
  }

  rule { ($array, $test:expr) } => {
    for (var i = 0; i < $array.length; i++) {
      if (!$test($array[i], i, $array)) {
        return false;
      }   
    }
    
    return true;
  }
  
  rule { ($array, $test:expr, $scope) } => {
    for (var i = 0; i < $array.length; i++) {
      if (!$test.call($scope, $array[i], i, $array)) {
        return false;
      }   
    }
    
    return true;
  }
  
  rule { ($array, $test:ident, $scope) } => {
    for (var i = 0; i < $array.length; i++) {
      if (!$test.call($scope, $array[i], i, $array)) {
        return false;
      }   
    }
    
    return true;
  }
}

macro some {
  rule { ($array, $test:expr) } => {
    for (var i = 0; i < $array.length; i++) {
      if ($test($array[i], i, $array)) {
        return true;
      }
    }
    
    return false;
  }
  
  rule { ($array, $test:ident) } => {
    for (var i = 0; i < $array.length; i++) {
      if ($test($array[i], i, $array)) {
        return true;
      }
    }
    
    return false;
  }
  
  rule { ($array, $test:ident, $scope) } => {
    for (var i = 0; i < $array.length; i++) {
      if ($test.call($scope, $array[i], i, $array)) {
        return true;
      }
    }
    
    return false;
  }
  
  rule { ($array, $test:expr, $scope) } => {
    for (var i = 0; i < $array.length; i++) {
      if ($test.call($scope, $array[i], i, $array)) {
        return true;
      }
    }
    
    return false;
  }
}



exports.forEach = forEach;
exports.map = map;
exports.filter = filter;
exports.reduce = reduce;
exports.reduceRight = reduceRight;
exports.every = every;
export.some = some;