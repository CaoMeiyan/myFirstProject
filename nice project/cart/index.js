/**
 * Created by dell on 2016/6/27.
 */
!function () {
    var app=angular.module('appModule',[]);
    app.controller('ctrl',function ($scope,$http) {
        $scope.dis=0.2;
        $http.get('./computer.json').success(function (data) {
            $scope.products=data;
        });
        $scope.arr = [
            {name:'折扣1',value:0.1},
            {name:'折扣2',value:0.2},
            {name:'折扣3',value:0.3},
            {name:'折扣4',value:0.4}
        ];
        $scope.selectAll=function () {
            $scope.products.forEach(function (item) {
                item.selected=$scope.checks;
            })
        }
        $scope.select=function () {
            var flag=true;
            $scope.products.forEach(function (item) {
                if(!item.selected){
                    flag=false
                }
            });
            $scope.checks=flag;
        }
        $scope.deleteSingle=function (cur) {
            $scope.products=$scope.products.filter(function (item) {
                return cur!=item
            });
        }
        $scope.deleteAll=function () {
            $scope.products.forEach(function (item) {
                if(item.selected){
                    $scope.deleteSingle(item);
                }
            });
        }
        $scope.total=function () {
            var sum=0;
            $scope.products.forEach(function (item) {
                return sum+=item.price*item.count
            });
            return sum;
        }
        $scope.count=function () {
            var num=$scope.products.length;
            $scope.products.forEach(function (item) {
                if(item.selected){
                    num--
                }
            });
            return num;
        }
        $scope.countAll=function () {
            var num=0;
            $scope.products.forEach(function (item) {
                return num+=item.count*1
            });
            return num;
        }
    });
}();