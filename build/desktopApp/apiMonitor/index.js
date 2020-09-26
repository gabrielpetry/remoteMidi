"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stopExpressServer = exports.startExpressServer = void 0;
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var body_parser_1 = require("body-parser");
var http_1 = __importDefault(require("http"));
var socket_io_1 = __importDefault(require("socket.io"));
var path_1 = __importDefault(require("path"));
var startDatabase_1 = require("../../rxDb/startDatabase");
var app = express_1.default();
var httpServer = http_1.default.createServer(app);
var io = socket_io_1.default(httpServer);
var rxDb = null;
io.on('connection', function (socket) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, startDatabase_1.getDatabase()];
            case 1:
                rxDb = _a.sent();
                socket.on('faderChanged', function (data) {
                    // console.log(data)
                    var fader = data.fader, channel = data.channel, controller = data.controller, value = data.value;
                    console.dir(data);
                    rxDb.items.atomicUpsert({
                        key: 'faderChanged',
                        value: {
                            fader: fader,
                            channel: channel,
                            value: value,
                            controller: controller,
                        },
                    });
                });
                socket.on('pushButtonClicked', function (data) {
                    var buttonName = data.buttonName, value = data.value, velocity = data.velocity;
                    rxDb.items.atomicUpsert({
                        key: buttonName,
                        value: {
                            value: value,
                            velocity: velocity,
                        },
                    });
                });
                socket.on('disconnect', function () { });
                return [2 /*return*/];
        }
    });
}); });
var port = parseInt(process.env.port) || 6548;
var server = null;
app.use(cors_1.default());
app.use(body_parser_1.json());
app.get('/', function (req, res) {
    res.sendFile(path_1.default.join(__dirname + '/pages/index.html'));
});
function startExpressServer() {
    server = httpServer.listen(port, function () {
        console.log("Express server is running at " + port + "!");
    });
}
exports.startExpressServer = startExpressServer;
function stopExpressServer() {
    server.close();
}
exports.stopExpressServer = stopExpressServer;
//# sourceMappingURL=index.js.map