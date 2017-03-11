"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_service_1 = require('../services/http.service');
var AppComponent = (function () {
    function AppComponent(service) {
        this.service = service;
        this.payroll = [];
        this.uploaded = false;
        this.appError = false;
        this.duplicateFile = false;
    }
    AppComponent.prototype.ngOnInit = function () {
        this.getData();
    };
    AppComponent.prototype.onChange = function (event) {
        var _this = this;
        var file = event.srcElement.files;
        if (file.length) {
            this.duplicateFile = false;
            this.uploaded = false;
            this.service.uploadFile(file).subscribe(function (res) {
                if (res.duplicateReportId) {
                    _this.duplicateFile = true;
                }
                else {
                    _this.uploaded = true;
                    _this.getData();
                }
            }, function (err) {
                _this.appError = true;
            });
        }
    };
    AppComponent.prototype.close = function (trigger) {
        this.uploaded = false;
    };
    AppComponent.prototype.getData = function () {
        var _this = this;
        this.service.getReport().subscribe(function (data) {
            _this.appError = false;
            _this.payroll = data;
        }, function (err) {
            _this.appError = true;
        });
    };
    AppComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-app',
            templateUrl: './app.component.html'
        }), 
        __metadata('design:paramtypes', [http_service_1.HttpClient])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map