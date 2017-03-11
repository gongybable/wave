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
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var Rx_1 = require('rxjs/Rx');
var HttpClient = (function () {
    function HttpClient(http) {
        this.http = http;
        this.endpoint = 'http://localhost:8000/api/';
        this.options = new http_1.RequestOptions(new http_1.Headers());
    }
    HttpClient.prototype.getReport = function () {
        return this.get(this.endpoint + 'report', this.options);
    };
    HttpClient.prototype.uploadFile = function (files) {
        var formData = new FormData();
        formData.append('file', files[0], files[0].name);
        return this.post(this.endpoint + 'upload', formData, this.options);
    };
    HttpClient.prototype.get = function (url, options) {
        return this.http.get(url, options)
            .map(this.parseResponse)
            .catch(this.handleError);
    };
    HttpClient.prototype.post = function (url, params, options) {
        return this.http.post(url, params, options)
            .map(this.parseResponse)
            .catch(this.handleError);
    };
    HttpClient.prototype.parseResponse = function (resp) {
        if (resp.status >= 200 && resp.status < 300) {
            return resp.json();
        }
        var errMsg = resp.status + " - " + resp.statusText;
        throw new Error(errMsg);
    };
    HttpClient.prototype.handleError = function (error) {
        var errMsg = error.message ? error.message : error.toString();
        return Rx_1.Observable.throw(errMsg);
    };
    HttpClient = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], HttpClient);
    return HttpClient;
}());
exports.HttpClient = HttpClient;
//# sourceMappingURL=http.service.js.map