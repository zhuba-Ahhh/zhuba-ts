"use strict";
exports.__esModule = true;
var LazyMan = /** @class */ (function () {
    function LazyMan(name) {
        var _this = this;
        this.tasks = []; // 任务列表
        this.name = name;
        setTimeout(function () {
            _this.next();
        });
    }
    // next
    LazyMan.prototype.next = function () {
        var task = this.tasks.shift(); // 取出当前 tasks 的第一个任务
        if (task)
            task();
    };
    LazyMan.prototype.eat = function (food) {
        var _this = this;
        var task = function () {
            console.info("".concat(_this.name, " eat ").concat(food));
            _this.next(); // 立刻执行下一个任务
        };
        this.tasks.push(task);
        return this; // 链式调用
    };
    LazyMan.prototype.sleep = function (seconds) {
        var _this = this;
        var task = function () {
            setTimeout(function () {
                console.info("".concat(_this.name, " \u5DF2\u7ECF\u7761\u5B8C\u4E86 ").concat(seconds, "s, \u5F00\u59CB\u6267\u884C\u4E0B\u4E00\u4E2A\u4EFB\u52A1"));
                _this.next();
            }, seconds * 1000);
        };
        this.tasks.push(task);
        return this; // 链式调用
    };
    return LazyMan;
}());
var me = new LazyMan("zhuba");
me.eat("苹果")
    .eat("香蕉")
    .sleep(2)
    .eat("葡萄")
    .eat("橘子")
    .sleep(2)
    .eat("栗子")
    .eat("梨子");
