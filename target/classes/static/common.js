"use strict";
(self["webpackChunkindex_test"] = self["webpackChunkindex_test"] || []).push([["common"],{

/***/ 6502:
/*!*******************************************************!*\
  !*** ./src/main/webapp/app/config/input.constants.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DATE_FORMAT": () => (/* binding */ DATE_FORMAT),
/* harmony export */   "DATE_TIME_FORMAT": () => (/* binding */ DATE_TIME_FORMAT)
/* harmony export */ });
const DATE_FORMAT = 'YYYY-MM-DD';
const DATE_TIME_FORMAT = 'YYYY-MM-DDTHH:mm';


/***/ }),

/***/ 4991:
/*!************************************************************!*\
  !*** ./src/main/webapp/app/config/pagination.constants.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ITEMS_PER_PAGE": () => (/* binding */ ITEMS_PER_PAGE),
/* harmony export */   "ASC": () => (/* binding */ ASC),
/* harmony export */   "DESC": () => (/* binding */ DESC),
/* harmony export */   "SORT": () => (/* binding */ SORT)
/* harmony export */ });
const ITEMS_PER_PAGE = 20;
const ASC = 'asc';
const DESC = 'desc';
const SORT = 'sort';


/***/ }),

/***/ 7354:
/*!**********************************************************!*\
  !*** ./src/main/webapp/app/core/request/request-util.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createRequestOption": () => (/* binding */ createRequestOption)
/* harmony export */ });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common/http */ 3549);

const createRequestOption = (req) => {
    let options = new _angular_common_http__WEBPACK_IMPORTED_MODULE_0__.HttpParams();
    if (req) {
        Object.keys(req).forEach(key => {
            if (key !== 'sort') {
                options = options.set(key, req[key]);
            }
        });
        if (req.sort) {
            req.sort.forEach((val) => {
                options = options.append('sort', val);
            });
        }
    }
    return options;
};


/***/ }),

/***/ 7575:
/*!****************************************************!*\
  !*** ./src/main/webapp/app/core/util/operators.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isPresent": () => (/* binding */ isPresent),
/* harmony export */   "filterNaN": () => (/* binding */ filterNaN)
/* harmony export */ });
/*
 * Function used to workaround https://github.com/microsoft/TypeScript/issues/16069
 * es2019 alternative `const filteredArr = myArr.flatMap((x) => x ? x : []);`
 */
function isPresent(t) {
    return t !== undefined && t !== null;
}
const filterNaN = (input) => (isNaN(input) ? 0 : input);


/***/ }),

/***/ 5262:
/*!*************************************************************************!*\
  !*** ./src/main/webapp/app/entities/clasificador/clasificador.model.ts ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Clasificador": () => (/* binding */ Clasificador),
/* harmony export */   "getClasificadorIdentifier": () => (/* binding */ getClasificadorIdentifier)
/* harmony export */ });
class Clasificador {
    constructor(id, nombre, descripcion, ejemplos, identificadors, parentCS, seccion, hijoC) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.ejemplos = ejemplos;
        this.identificadors = identificadors;
        this.parentCS = parentCS;
        this.seccion = seccion;
        this.hijoC = hijoC;
    }
}
function getClasificadorIdentifier(clasificador) {
    return clasificador.id;
}


/***/ }),

/***/ 7475:
/*!***********************************************************************************!*\
  !*** ./src/main/webapp/app/entities/clasificador/service/clasificador.service.ts ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ClasificadorService": () => (/* binding */ ClasificadorService)
/* harmony export */ });
/* harmony import */ var app_core_util_operators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! app/core/util/operators */ 7575);
/* harmony import */ var app_core_request_request_util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! app/core/request/request-util */ 7354);
/* harmony import */ var _clasificador_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../clasificador.model */ 5262);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 1858);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common/http */ 3549);
/* harmony import */ var app_core_config_application_config_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/core/config/application-config.service */ 8986);






class ClasificadorService {
    constructor(http, applicationConfigService) {
        this.http = http;
        this.applicationConfigService = applicationConfigService;
        this.resourceUrl = this.applicationConfigService.getEndpointFor('api/clasificadors');
    }
    create(clasificador) {
        return this.http.post(this.resourceUrl, clasificador, { observe: 'response' });
    }
    update(clasificador) {
        return this.http.put(`${this.resourceUrl}/${(0,_clasificador_model__WEBPACK_IMPORTED_MODULE_2__.getClasificadorIdentifier)(clasificador)}`, clasificador, {
            observe: 'response',
        });
    }
    partialUpdate(clasificador) {
        return this.http.patch(`${this.resourceUrl}/${(0,_clasificador_model__WEBPACK_IMPORTED_MODULE_2__.getClasificadorIdentifier)(clasificador)}`, clasificador, {
            observe: 'response',
        });
    }
    find(id) {
        return this.http.get(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
    query(req) {
        const options = (0,app_core_request_request_util__WEBPACK_IMPORTED_MODULE_1__.createRequestOption)(req);
        return this.http.get(this.resourceUrl, { params: options, observe: 'response' });
    }
    delete(id) {
        return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
    addClasificadorToCollectionIfMissing(clasificadorCollection, ...clasificadorsToCheck) {
        const clasificadors = clasificadorsToCheck.filter(app_core_util_operators__WEBPACK_IMPORTED_MODULE_0__.isPresent);
        if (clasificadors.length > 0) {
            const clasificadorCollectionIdentifiers = clasificadorCollection.map(clasificadorItem => (0,_clasificador_model__WEBPACK_IMPORTED_MODULE_2__.getClasificadorIdentifier)(clasificadorItem));
            const clasificadorsToAdd = clasificadors.filter(clasificadorItem => {
                const clasificadorIdentifier = (0,_clasificador_model__WEBPACK_IMPORTED_MODULE_2__.getClasificadorIdentifier)(clasificadorItem);
                if (clasificadorIdentifier == null || clasificadorCollectionIdentifiers.includes(clasificadorIdentifier)) {
                    return false;
                }
                clasificadorCollectionIdentifiers.push(clasificadorIdentifier);
                return true;
            });
            return [...clasificadorsToAdd, ...clasificadorCollection];
        }
        return clasificadorCollection;
    }
}
ClasificadorService.ɵfac = function ClasificadorService_Factory(t) { return new (t || ClasificadorService)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_5__.HttpClient), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](app_core_config_application_config_service__WEBPACK_IMPORTED_MODULE_3__.ApplicationConfigService)); };
ClasificadorService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjectable"]({ token: ClasificadorService, factory: ClasificadorService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 3971:
/*!*************************************************************************!*\
  !*** ./src/main/webapp/app/entities/codigo-desde/codigo-desde.model.ts ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CodigoDESDE": () => (/* binding */ CodigoDESDE),
/* harmony export */   "getCodigoDESDEIdentifier": () => (/* binding */ getCodigoDESDEIdentifier)
/* harmony export */ });
class CodigoDESDE {
    constructor(id, version, fecha, introduccion, terminologiaComun, importanciaContexto, descripcion, poblacionObjetivo, referencia, seccions) {
        this.id = id;
        this.version = version;
        this.fecha = fecha;
        this.introduccion = introduccion;
        this.terminologiaComun = terminologiaComun;
        this.importanciaContexto = importanciaContexto;
        this.descripcion = descripcion;
        this.poblacionObjetivo = poblacionObjetivo;
        this.referencia = referencia;
        this.seccions = seccions;
    }
}
function getCodigoDESDEIdentifier(codigoDESDE) {
    return codigoDESDE.id;
}


/***/ }),

/***/ 292:
/*!***********************************************************************************!*\
  !*** ./src/main/webapp/app/entities/codigo-desde/service/codigo-desde.service.ts ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CodigoDESDEService": () => (/* binding */ CodigoDESDEService)
/* harmony export */ });
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ 4058);
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dayjs */ 1653);
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var app_core_util_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! app/core/util/operators */ 7575);
/* harmony import */ var app_config_input_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! app/config/input.constants */ 6502);
/* harmony import */ var app_core_request_request_util__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/core/request/request-util */ 7354);
/* harmony import */ var _codigo_desde_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../codigo-desde.model */ 3971);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 1858);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common/http */ 3549);
/* harmony import */ var app_core_config_application_config_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! app/core/config/application-config.service */ 8986);









class CodigoDESDEService {
    constructor(http, applicationConfigService) {
        this.http = http;
        this.applicationConfigService = applicationConfigService;
        this.resourceUrl = this.applicationConfigService.getEndpointFor('api/codigo-desdes');
    }
    create(codigoDESDE) {
        const copy = this.convertDateFromClient(codigoDESDE);
        return this.http
            .post(this.resourceUrl, copy, { observe: 'response' })
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.map)((res) => this.convertDateFromServer(res)));
    }
    update(codigoDESDE) {
        const copy = this.convertDateFromClient(codigoDESDE);
        return this.http
            .put(`${this.resourceUrl}/${(0,_codigo_desde_model__WEBPACK_IMPORTED_MODULE_4__.getCodigoDESDEIdentifier)(codigoDESDE)}`, copy, { observe: 'response' })
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.map)((res) => this.convertDateFromServer(res)));
    }
    partialUpdate(codigoDESDE) {
        const copy = this.convertDateFromClient(codigoDESDE);
        return this.http
            .patch(`${this.resourceUrl}/${(0,_codigo_desde_model__WEBPACK_IMPORTED_MODULE_4__.getCodigoDESDEIdentifier)(codigoDESDE)}`, copy, { observe: 'response' })
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.map)((res) => this.convertDateFromServer(res)));
    }
    find(id) {
        return this.http
            .get(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.map)((res) => this.convertDateFromServer(res)));
    }
    query(req) {
        const options = (0,app_core_request_request_util__WEBPACK_IMPORTED_MODULE_3__.createRequestOption)(req);
        return this.http
            .get(this.resourceUrl, { params: options, observe: 'response' })
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.map)((res) => this.convertDateArrayFromServer(res)));
    }
    delete(id) {
        return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
    addCodigoDESDEToCollectionIfMissing(codigoDESDECollection, ...codigoDESDESToCheck) {
        const codigoDESDES = codigoDESDESToCheck.filter(app_core_util_operators__WEBPACK_IMPORTED_MODULE_1__.isPresent);
        if (codigoDESDES.length > 0) {
            const codigoDESDECollectionIdentifiers = codigoDESDECollection.map(codigoDESDEItem => (0,_codigo_desde_model__WEBPACK_IMPORTED_MODULE_4__.getCodigoDESDEIdentifier)(codigoDESDEItem));
            const codigoDESDESToAdd = codigoDESDES.filter(codigoDESDEItem => {
                const codigoDESDEIdentifier = (0,_codigo_desde_model__WEBPACK_IMPORTED_MODULE_4__.getCodigoDESDEIdentifier)(codigoDESDEItem);
                if (codigoDESDEIdentifier == null || codigoDESDECollectionIdentifiers.includes(codigoDESDEIdentifier)) {
                    return false;
                }
                codigoDESDECollectionIdentifiers.push(codigoDESDEIdentifier);
                return true;
            });
            return [...codigoDESDESToAdd, ...codigoDESDECollection];
        }
        return codigoDESDECollection;
    }
    convertDateFromClient(codigoDESDE) {
        var _a;
        return Object.assign({}, codigoDESDE, {
            fecha: ((_a = codigoDESDE.fecha) === null || _a === void 0 ? void 0 : _a.isValid()) ? codigoDESDE.fecha.format(app_config_input_constants__WEBPACK_IMPORTED_MODULE_2__.DATE_FORMAT) : undefined,
        });
    }
    convertDateFromServer(res) {
        if (res.body) {
            res.body.fecha = res.body.fecha ? dayjs__WEBPACK_IMPORTED_MODULE_0__(res.body.fecha) : undefined;
        }
        return res;
    }
    convertDateArrayFromServer(res) {
        if (res.body) {
            res.body.forEach((codigoDESDE) => {
                codigoDESDE.fecha = codigoDESDE.fecha ? dayjs__WEBPACK_IMPORTED_MODULE_0__(codigoDESDE.fecha) : undefined;
            });
        }
        return res;
    }
}
CodigoDESDEService.ɵfac = function CodigoDESDEService_Factory(t) { return new (t || CodigoDESDEService)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_8__.HttpClient), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](app_core_config_application_config_service__WEBPACK_IMPORTED_MODULE_5__.ApplicationConfigService)); };
CodigoDESDEService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjectable"]({ token: CodigoDESDEService, factory: CodigoDESDEService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 9117:
/*!***************************************************************!*\
  !*** ./src/main/webapp/app/entities/seccion/seccion.model.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Seccion": () => (/* binding */ Seccion),
/* harmony export */   "getSeccionIdentifier": () => (/* binding */ getSeccionIdentifier)
/* harmony export */ });
class Seccion {
    constructor(id, nombre, descripcion, codigo, clasificadors, codigoDESDE) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.codigo = codigo;
        this.clasificadors = clasificadors;
        this.codigoDESDE = codigoDESDE;
    }
}
function getSeccionIdentifier(seccion) {
    return seccion.id;
}


/***/ }),

/***/ 6171:
/*!*************************************************************************!*\
  !*** ./src/main/webapp/app/entities/seccion/service/seccion.service.ts ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SeccionService": () => (/* binding */ SeccionService)
/* harmony export */ });
/* harmony import */ var app_core_util_operators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! app/core/util/operators */ 7575);
/* harmony import */ var app_core_request_request_util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! app/core/request/request-util */ 7354);
/* harmony import */ var _seccion_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../seccion.model */ 9117);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 1858);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common/http */ 3549);
/* harmony import */ var app_core_config_application_config_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! app/core/config/application-config.service */ 8986);






class SeccionService {
    constructor(http, applicationConfigService) {
        this.http = http;
        this.applicationConfigService = applicationConfigService;
        this.resourceUrl = this.applicationConfigService.getEndpointFor('api/seccions');
    }
    create(seccion) {
        return this.http.post(this.resourceUrl, seccion, { observe: 'response' });
    }
    update(seccion) {
        return this.http.put(`${this.resourceUrl}/${(0,_seccion_model__WEBPACK_IMPORTED_MODULE_2__.getSeccionIdentifier)(seccion)}`, seccion, { observe: 'response' });
    }
    partialUpdate(seccion) {
        return this.http.patch(`${this.resourceUrl}/${(0,_seccion_model__WEBPACK_IMPORTED_MODULE_2__.getSeccionIdentifier)(seccion)}`, seccion, { observe: 'response' });
    }
    find(id) {
        return this.http.get(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
    query(req) {
        const options = (0,app_core_request_request_util__WEBPACK_IMPORTED_MODULE_1__.createRequestOption)(req);
        return this.http.get(this.resourceUrl, { params: options, observe: 'response' });
    }
    delete(id) {
        return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
    addSeccionToCollectionIfMissing(seccionCollection, ...seccionsToCheck) {
        const seccions = seccionsToCheck.filter(app_core_util_operators__WEBPACK_IMPORTED_MODULE_0__.isPresent);
        if (seccions.length > 0) {
            const seccionCollectionIdentifiers = seccionCollection.map(seccionItem => (0,_seccion_model__WEBPACK_IMPORTED_MODULE_2__.getSeccionIdentifier)(seccionItem));
            const seccionsToAdd = seccions.filter(seccionItem => {
                const seccionIdentifier = (0,_seccion_model__WEBPACK_IMPORTED_MODULE_2__.getSeccionIdentifier)(seccionItem);
                if (seccionIdentifier == null || seccionCollectionIdentifiers.includes(seccionIdentifier)) {
                    return false;
                }
                seccionCollectionIdentifiers.push(seccionIdentifier);
                return true;
            });
            return [...seccionsToAdd, ...seccionCollection];
        }
        return seccionCollection;
    }
}
SeccionService.ɵfac = function SeccionService_Factory(t) { return new (t || SeccionService)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_5__.HttpClient), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](app_core_config_application_config_service__WEBPACK_IMPORTED_MODULE_3__.ApplicationConfigService)); };
SeccionService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjectable"]({ token: SeccionService, factory: SeccionService.ɵfac, providedIn: 'root' });


/***/ })

}]);
//# sourceMappingURL=common.js.map