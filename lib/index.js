var farmFactory = (function () {
	'use strict';

	function createCommonjsModule(fn) {
	  var module = { exports: {} };
		return fn(module, module.exports), module.exports;
	}

	var _typeof_1 = createCommonjsModule(function (module) {
	  function _typeof(obj) {
	    "@babel/helpers - typeof";

	    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
	      module.exports = _typeof = function _typeof(obj) {
	        return typeof obj;
	      };
	    } else {
	      module.exports = _typeof = function _typeof(obj) {
	        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
	      };
	    }

	    return _typeof(obj);
	  }

	  module.exports = _typeof;
	});

	var _assign = function __assign() {
	  _assign = Object.assign || function __assign(t) {
	    for (var s, i = 1, n = arguments.length; i < n; i++) {
	      s = arguments[i];

	      for (var p in s) {
	        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
	      }
	    }

	    return t;
	  };

	  return _assign.apply(this, arguments);
	};
	function __awaiter(thisArg, _arguments, P, generator) {
	  return new (P || (P = Promise))(function (resolve, reject) {
	    function fulfilled(value) {
	      try {
	        step(generator.next(value));
	      } catch (e) {
	        reject(e);
	      }
	    }

	    function rejected(value) {
	      try {
	        step(generator["throw"](value));
	      } catch (e) {
	        reject(e);
	      }
	    }

	    function step(result) {
	      result.done ? resolve(result.value) : new P(function (resolve) {
	        resolve(result.value);
	      }).then(fulfilled, rejected);
	    }

	    step((generator = generator.apply(thisArg, _arguments || [])).next());
	  });
	}
	function __generator(thisArg, body) {
	  var _ = {
	    label: 0,
	    sent: function sent() {
	      if (t[0] & 1) throw t[1];
	      return t[1];
	    },
	    trys: [],
	    ops: []
	  },
	      f,
	      y,
	      t,
	      g;
	  return g = {
	    next: verb(0),
	    "throw": verb(1),
	    "return": verb(2)
	  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
	    return this;
	  }), g;

	  function verb(n) {
	    return function (v) {
	      return step([n, v]);
	    };
	  }

	  function step(op) {
	    if (f) throw new TypeError("Generator is already executing.");

	    while (_) {
	      try {
	        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
	        if (y = 0, t) op = [op[0] & 2, t.value];

	        switch (op[0]) {
	          case 0:
	          case 1:
	            t = op;
	            break;

	          case 4:
	            _.label++;
	            return {
	              value: op[1],
	              done: false
	            };

	          case 5:
	            _.label++;
	            y = op[1];
	            op = [0];
	            continue;

	          case 7:
	            op = _.ops.pop();

	            _.trys.pop();

	            continue;

	          default:
	            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
	              _ = 0;
	              continue;
	            }

	            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
	              _.label = op[1];
	              break;
	            }

	            if (op[0] === 6 && _.label < t[1]) {
	              _.label = t[1];
	              t = op;
	              break;
	            }

	            if (t && _.label < t[2]) {
	              _.label = t[2];

	              _.ops.push(op);

	              break;
	            }

	            if (t[2]) _.ops.pop();

	            _.trys.pop();

	            continue;
	        }

	        op = body.call(thisArg, _);
	      } catch (e) {
	        op = [6, e];
	        y = 0;
	      } finally {
	        f = t = 0;
	      }
	    }

	    if (op[0] & 5) throw op[1];
	    return {
	      value: op[0] ? op[1] : void 0,
	      done: true
	    };
	  }
	}
	function __spreadArrays() {
	  for (var s = 0, i = 0, il = arguments.length; i < il; i++) {
	    s += arguments[i].length;
	  }

	  for (var r = Array(s), k = 0, i = 0; i < il; i++) {
	    for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) {
	      r[k] = a[j];
	    }
	  }

	  return r;
	}

	var Event = /** @class */ (function () {
	    function Event(name) {
	        this.name = name;
	        this.handlers = [];
	    }
	    /**
	     * Add handler to current Event
	     */
	    Event.prototype.addHandler = function (handler) {
	        var _this = this;
	        this.handlers.push(handler.bind({
	            unsubscribe: function () {
	                _this.removeHandler(handler);
	            },
	        }));
	    };
	    /**
	     * Remove handler from current Event
	     */
	    Event.prototype.removeHandler = function (handler) {
	        var handlerIndex = this.handlers.indexOf(handler);
	        this.handlers.splice(handlerIndex, 1);
	    };
	    /**
	     * Call all handlers in all priorities of current Event
	     */
	    Event.prototype.call = function () {
	        var eventArgs = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            eventArgs[_i] = arguments[_i];
	        }
	        this.handlers.forEach(function (handler) {
	            try {
	                handler.apply(void 0, eventArgs);
	            }
	            catch (err) {
	                console.error(err);
	            }
	        });
	    };
	    return Event;
	}());
	var EventAggregator = /** @class */ (function () {
	    function EventAggregator() {
	        this.events = {};
	    }
	    /**
	     * Get Event by name
	     */
	    EventAggregator.prototype.getEvent = function (name) {
	        var event = this.events[name];
	        if (!event) {
	            event = new Event(name);
	            this.events[name] = event;
	        }
	        return event;
	    };
	    EventAggregator.prototype.subscribe = function (name, handler) {
	        var event = this.getEvent(name);
	        event.addHandler(handler);
	        return { event: event, handler: handler };
	    };
	    EventAggregator.prototype.unsubscribe = function (eventName, handler) {
	        var event = this.getEvent(eventName);
	        event.removeHandler(handler);
	    };
	    EventAggregator.prototype.dispatch = function (name) {
	        var eventArgs = [];
	        for (var _i = 1; _i < arguments.length; _i++) {
	            eventArgs[_i - 1] = arguments[_i];
	        }
	        var event = this.getEvent(name);
	        if (event) {
	            event.call.apply(event, eventArgs);
	        }
	    };
	    /**
	     * Subscribe to Event and unsubscribe after call
	     */
	    EventAggregator.prototype.once = function (eventName, handler) {
	        var event = this.getEvent(eventName);
	        var handlerWrapper = function () {
	            var args = [];
	            for (var _i = 0; _i < arguments.length; _i++) {
	                args[_i] = arguments[_i];
	            }
	            var result = handler.apply(void 0, args);
	            if (result) {
	                event.removeHandler(handlerWrapper);
	            }
	        };
	        event.addHandler(handlerWrapper);
	        return { event: event, handlerWrapper: handlerWrapper };
	    };
	    return EventAggregator;
	}());

	var events = new EventAggregator();

	var state = {
	    opts: null,
	    web3: null,
	    account: null,
	    contracts: null,
	    stakingTokenName: '',
	    rewardsTokenName: '',
	};
	var getState = function () { return state; };
	var setState = function (newState) {
	    state = _assign(_assign({}, state), newState);
	    events.dispatch('state change', state);
	};

	var constants = {
	    infuraNetworks: {
	        mainnet: 'https://mainnet.infura.io/v3/5ffc47f65c4042ce847ef66a3fa70d4c',
	        kovan: 'https://kovan.infura.io/v3/5ffc47f65c4042ce847ef66a3fa70d4c',
	    },
	    ids: {
	        timerRoot: 'farmfactory-timer-root',
	        widgetRoot: 'farmfactory-widget-root',
	        modalsRoot: 'farmfactory-modals-root',
	        infoModalRoot: 'farmfactory-info-modal-root',
	        widget: {
	            root: 'farmfactory-widget-root',
	            earned: 'farmfactory-widget-earned',
	            staked: 'farmfactory-widget-staked',
	            lpsButtons: 'farmfactory-widget-lps-buttons',
	            harvestButton: 'farmfactory-widget-harvest-button',
	            approveButton: 'farmfactory-widget-approve-button',
	            depositButton: 'farmfactory-widget-deposit-button',
	            withdrawButton: 'farmfactory-widget-withdraw-button',
	        },
	        depositForm: {
	            title: 'farmfactory-deposit-title',
	            input: 'farmfactory-deposit-input',
	            cancelButton: 'farmfactory-deposit-cancel-button',
	            depositButton: 'farmfactory-deposit-deposit-button',
	        },
	        withdrawForm: {
	            title: 'farmfactory-withdraw-title',
	            input: 'farmfactory-withdraw-input',
	            cancelButton: 'farmfactory-withdraw-cancel-button',
	            withdrawButton: 'farmfactory-withdraw-deposit-button',
	        },
	        infoModal: {
	            closeButton: 'farmfactory-info-modal-close-button',
	            cancelButton: 'farmfactory-info-modal-cancel-button',
	        },
	        wrongNetworkModal: {
	            closeButton: 'farmfactory-wrong-network-modal-close-button',
	        },
	        connectModal: {
	            closeButton: 'farmfactory-connect-modal-close-button',
	            connectButton: 'farmfactory-connect-modal-connect-button',
	            cancelButton: 'farmfactory-connect-modal-cancel-button',
	        },
	        depositModal: {
	            closeButton: 'farmfactory-deposit-modal-close-button',
	            title: 'farmfactory-deposit-modal-title',
	            depositButton: 'farmfactory-deposit-modal-deposit-button',
	            cancelButton: 'farmfactory-deposit-modal-cancel-button',
	            availableToDeposit: 'farmfactory-deposit-modal-available-to-deposit',
	            depositAmount: 'farmfactory-deposit-modal-deposit-amount',
	        },
	        withdrawModal: {
	            closeButton: 'farmfactory-withdraw-modal-close-button',
	            title: 'farmfactory-withdraw-modal-title',
	            withdrawButton: 'farmfactory-withdraw-modal-withdraw-button',
	            cancelButton: 'farmfactory-withdraw-modal-cancel-button',
	            availableToWithdraw: 'farmfactory-withdraw-modal-available-to-withdraw',
	            withdrawAmount: 'farmfactory-deposit-modal-withdraw-amount',
	        },
	        harvestModal: {
	            closeButton: 'farmfactory-harvest-modal-close-button',
	            connectButton: 'farmfactory-harvest-modal-connect-button',
	            cancelButton: 'farmfactory-harvest-modal-cancel-button',
	        },
	    }
	};

	var html = function (message) { return "\n  <div class=\"farmfactory-overlay\">\n    <div class=\"farmfactory-modal\">\n      <button class=\"farmfactory-closeButton\" id=\"" + constants.ids.infoModal.closeButton + "\">\n        <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"32\" height=\"32\" fill=\"none\" viewBox=\"0 0 32 32\">\n          <path stroke=\"currentColor\" stroke-width=\"2\" d=\"M9 9l7 6.99L23 9l-6.99 7L23 23l-7-6.99L9 23l6.99-7L9 9z\" opacity=\".9\"/>\n        </svg>\n      </button>\n      <div class=\"farmfactory-inner\">\n        <div>" + message + "</div>\n      </div>\n      <div class=\"farmfactory-footer\">\n        <button class=\"farmfactory-button gray\" id=\"" + constants.ids.infoModal.cancelButton + "\">Close</button>\n      </div>\n    </div>\n  </div>\n"; };
	var open = function (message) {
	    document.getElementById(constants.ids.infoModalRoot).innerHTML = html(message);
	    var closeButton = document.getElementById(constants.ids.infoModal.closeButton);
	    var cancelButton = document.getElementById(constants.ids.infoModal.cancelButton);
	    closeButton.addEventListener('click', close);
	    cancelButton.addEventListener('click', close);
	};
	var close = function () {
	    document.getElementById(constants.ids.infoModalRoot).innerHTML = '';
	};
	var infoModal = {
	    open: open,
	    close: close,
	};

	var loader = function (black) { return "<div class=\"farmfactory-loader" + (black ? ' black' : '') + "\"><div></div><div></div><div></div></div>"; };

	var toFixed = function (value) {
	    if (!value) {
	        return value;
	    }
	    var newValue = Number(value).toFixed(5);
	    if (newValue === '0.00000') {
	        newValue = Number(value).toFixed(8);
	    }
	    if (newValue === '0.00000000') {
	        return value;
	    }
	    return newValue;
	};

	var html$1 = "\n  <div class=\"farmfactory-form farmfactory-deposit\">\n    <div class=\"farmfactory-title\" id=\"" + constants.ids.depositForm.title + "\"></div>\n    <input class=\"farmfactory-input\" id=\"" + constants.ids.depositForm.input + "\" type=\"number\" value=\"\" />\n    <div class=\"farmfactory-row\">\n      <button class=\"farmfactory-button\" id=\"" + constants.ids.depositForm.cancelButton + "\">Cancel</button>\n      <button class=\"farmfactory-button\" id=\"" + constants.ids.depositForm.depositButton + "\">Deposit</button>\n    </div>\n  </div>\n";
	var isLoading = false;
	var deposit = function () { return __awaiter(void 0, void 0, void 0, function () {
	    var _a, web3, contracts, account, input, cancelButton, depositButton, amount, value, res, err_1;
	    return __generator(this, function (_b) {
	        switch (_b.label) {
	            case 0:
	                _a = getState(), web3 = _a.web3, contracts = _a.contracts, account = _a.account;
	                if (isLoading) {
	                    return [2 /*return*/];
	                }
	                if (!contracts.farm) {
	                    infoModal.open('Farm contract is not connected');
	                    return [2 /*return*/];
	                }
	                input = document.getElementById(constants.ids.depositForm.input);
	                cancelButton = document.getElementById(constants.ids.depositForm.cancelButton);
	                depositButton = document.getElementById(constants.ids.depositForm.depositButton);
	                amount = Number(input.value);
	                if (!(amount > 0)) return [3 /*break*/, 5];
	                _b.label = 1;
	            case 1:
	                _b.trys.push([1, 3, 4, 5]);
	                isLoading = true;
	                cancelButton.classList.add('disabled');
	                depositButton.innerHTML = "Deposit " + loader();
	                value = web3.utils.toWei(String(amount));
	                return [4 /*yield*/, contracts.farm.methods.stake(value).send({ from: account })];
	            case 2:
	                res = _b.sent();
	                if (res.status) {
	                    infoModal.open('Transaction confirmed!');
	                }
	                hide();
	                events.dispatch('deposit success');
	                return [3 /*break*/, 5];
	            case 3:
	                err_1 = _b.sent();
	                console.error(err_1);
	                if (err_1.code == 'INVALID_ARGUMENT') {
	                    infoModal.open('Placeholder cannot be empty');
	                }
	                else {
	                    infoModal.open(err_1.message);
	                }
	                return [3 /*break*/, 5];
	            case 4:
	                isLoading = false;
	                cancelButton.classList.remove('disabled');
	                depositButton.innerHTML = 'Deposit';
	                return [7 /*endfinally*/];
	            case 5: return [2 /*return*/];
	        }
	    });
	}); };
	var addListeners = function () {
	    var cancelButton = document.getElementById(constants.ids.depositForm.cancelButton);
	    var depositButton = document.getElementById(constants.ids.depositForm.depositButton);
	    cancelButton.addEventListener('click', function () {
	        if (!cancelButton.classList.contains('disabled')) {
	            hide();
	        }
	    });
	    depositButton.addEventListener('click', function () {
	        deposit();
	    });
	};
	var show = function () { return __awaiter(void 0, void 0, void 0, function () {
	    var _a, contracts, account, stakingTokenName, root, title, balance;
	    return __generator(this, function (_b) {
	        switch (_b.label) {
	            case 0:
	                _a = getState(), contracts = _a.contracts, account = _a.account, stakingTokenName = _a.stakingTokenName;
	                root = document.getElementById(constants.ids.widget.root);
	                title = document.getElementById(constants.ids.depositForm.title);
	                root.classList.add('farmfactory-deposit-visible');
	                title.innerHTML = "Balance: " + loader(true);
	                return [4 /*yield*/, contracts.staking.methods.balanceOf(account).call()];
	            case 1:
	                balance = _b.sent();
	                title.innerHTML = "Balance: <b>" + toFixed(Number(balance) / 1e18) + " " + stakingTokenName + "</b>";
	                return [2 /*return*/];
	        }
	    });
	}); };
	var hide = function () {
	    document.getElementById(constants.ids.widget.root).classList.remove('farmfactory-deposit-visible');
	};
	var depositForm = {
	    html: html$1,
	    addListeners: addListeners,
	    show: show,
	    hide: hide,
	};

	var html$2 = "\n  <div class=\"farmfactory-form farmfactory-withdraw\">\n    <div class=\"farmfactory-title\" id=\"" + constants.ids.withdrawForm.title + "\"></div>\n    <input class=\"farmfactory-input\" id=\"" + constants.ids.withdrawForm.input + "\" type=\"number\" value=\"\" />\n    <div class=\"farmfactory-row\">\n      <button class=\"farmfactory-button\" id=\"" + constants.ids.withdrawForm.cancelButton + "\">Cancel</button>\n      <button class=\"farmfactory-button\" id=\"" + constants.ids.withdrawForm.withdrawButton + "\">Deposit</button>\n    </div>\n  </div>\n";
	var isLoading$1 = false;
	var withdraw = function () { return __awaiter(void 0, void 0, void 0, function () {
	    var _a, web3, contracts, account, input, cancelButton, withdrawButton, amount, value, res, err_1;
	    return __generator(this, function (_b) {
	        switch (_b.label) {
	            case 0:
	                _a = getState(), web3 = _a.web3, contracts = _a.contracts, account = _a.account;
	                if (isLoading$1) {
	                    return [2 /*return*/];
	                }
	                if (!contracts.farm) {
	                    infoModal.open('Farm contract is not connected');
	                    return [2 /*return*/];
	                }
	                input = document.getElementById(constants.ids.withdrawForm.input);
	                cancelButton = document.getElementById(constants.ids.withdrawForm.cancelButton);
	                withdrawButton = document.getElementById(constants.ids.withdrawForm.withdrawButton);
	                amount = Number(input.value);
	                if (!(amount > 0)) return [3 /*break*/, 5];
	                _b.label = 1;
	            case 1:
	                _b.trys.push([1, 3, 4, 5]);
	                isLoading$1 = true;
	                cancelButton.classList.add('disabled');
	                withdrawButton.innerHTML = "Withdraw " + loader();
	                value = web3.utils.toWei(String(amount));
	                return [4 /*yield*/, contracts.farm.methods.withdraw(value).send({ from: account })];
	            case 2:
	                res = _b.sent();
	                if (res.status) {
	                    infoModal.open('Transaction confirmed!');
	                }
	                hide$1();
	                events.dispatch('withdraw success');
	                return [3 /*break*/, 5];
	            case 3:
	                err_1 = _b.sent();
	                console.error(err_1);
	                if (err_1.code == 'INVALID_ARGUMENT') {
	                    infoModal.open('Placeholder cannot be empty');
	                }
	                else {
	                    infoModal.open(err_1.message);
	                }
	                return [3 /*break*/, 5];
	            case 4:
	                isLoading$1 = false;
	                cancelButton.classList.remove('disabled');
	                withdrawButton.innerHTML = 'Withdraw';
	                return [7 /*endfinally*/];
	            case 5: return [2 /*return*/];
	        }
	    });
	}); };
	var addListeners$1 = function () {
	    var cancelButton = document.getElementById(constants.ids.withdrawForm.cancelButton);
	    var withdrawButton = document.getElementById(constants.ids.withdrawForm.withdrawButton);
	    cancelButton.addEventListener('click', function () {
	        if (!cancelButton.classList.contains('disabled')) {
	            hide$1();
	        }
	    });
	    withdrawButton.addEventListener('click', function () {
	        withdraw();
	    });
	};
	var show$1 = function () { return __awaiter(void 0, void 0, void 0, function () {
	    var _a, contracts, account, stakingTokenName, root, title, balance;
	    return __generator(this, function (_b) {
	        switch (_b.label) {
	            case 0:
	                _a = getState(), contracts = _a.contracts, account = _a.account, stakingTokenName = _a.stakingTokenName;
	                root = document.getElementById(constants.ids.widget.root);
	                title = document.getElementById(constants.ids.withdrawForm.title);
	                root.classList.add('farmfactory-withdraw-visible');
	                title.innerHTML = "Balance: " + loader(true);
	                return [4 /*yield*/, contracts.farm.methods.balanceOf(account).call()];
	            case 1:
	                balance = _b.sent();
	                title.innerHTML = "Balance: <b>" + toFixed(Number(balance) / 1e18) + " " + stakingTokenName + "</b>";
	                return [2 /*return*/];
	        }
	    });
	}); };
	var hide$1 = function () {
	    document.getElementById(constants.ids.widget.root).classList.remove('farmfactory-withdraw-visible');
	};
	var withdrawForm = {
	    html: html$2,
	    addListeners: addListeners$1,
	    show: show$1,
	    hide: hide$1,
	};

	var isLoading$2 = false;
	var debug = function (str) {
	    var args = [];
	    for (var _i = 1; _i < arguments.length; _i++) {
	        args[_i - 1] = arguments[_i];
	    }
	    return console.log.apply(console, __spreadArrays(["widget: " + str], args));
	};
	var html$3 = "\n  <div class=\"farmfactory-root\" id=\"" + constants.ids.widget.root + "\">\n    " + depositForm.html + "\n    " + withdrawForm.html + "\n    <div class=\"farmfactory-widget\">\n      <div class=\"farmfactory-line\">\n        <div class=\"farmfactory-row\">\n          <div class=\"farmfactory-title\">Earned</div>\n          <div class=\"farmfactory-buttons\">\n            <button class=\"farmfactory-button disabled\" id=\"" + constants.ids.widget.harvestButton + "\">Harvest</button>\n          </div>\n        </div>\n        <div class=\"farmfactory-value\" id=\"" + constants.ids.widget.earned + "\">&mdash;</div>\n      </div>\n      <div class=\"farmfactory-line\">\n        <div class=\"farmfactory-row\">\n          <div class=\"farmfactory-title\">Staked</div>\n          <div class=\"farmfactory-buttons\" id=\"" + constants.ids.widget.lpsButtons + "\"></div>\n        </div>\n        <div class=\"farmfactory-value\" id=\"" + constants.ids.widget.staked + "\">&mdash;</div>\n      </div>\n    </div>\n  </div>\n";
	var approveButtonHtml = "\n  <button class=\"farmfactory-button\" id=\"" + constants.ids.widget.approveButton + "\">Approve</button>\n";
	var depositAndWithdrawButtonsHtml = "\n  <button class=\"farmfactory-button\" id=\"" + constants.ids.widget.depositButton + "\">Deposit</button>\n  <button class=\"farmfactory-button\" id=\"" + constants.ids.widget.withdrawButton + "\">Withdraw</button>\n";
	var errorHtml = function (error) { return "\n  <div class=\"farmfactory-root\" id=\"" + constants.ids.widget.root + "\">\n    <div class=\"farmfactory-widget-error\">\n      <span>" + error + "</span>\n    </div>\n  </div>\n"; };
	var getData = function () { return __awaiter(void 0, void 0, void 0, function () {
	    var _a, opts, contracts, account, stakingTokenName, rewardsTokenName, _b, farmingBalance, earnedTokens, allowance, balanceNode, earnedTokensNode, harvestButton, withdrawButton, err_1;
	    return __generator(this, function (_c) {
	        switch (_c.label) {
	            case 0:
	                debug('getData');
	                _a = getState(), opts = _a.opts, contracts = _a.contracts, account = _a.account, stakingTokenName = _a.stakingTokenName, rewardsTokenName = _a.rewardsTokenName;
	                if (!contracts) {
	                    return [2 /*return*/];
	                }
	                _c.label = 1;
	            case 1:
	                _c.trys.push([1, 3, , 4]);
	                return [4 /*yield*/, Promise.all([
	                        contracts.farm.methods.balanceOf(account).call(),
	                        contracts.farm.methods.earned(account).call(),
	                        contracts.staking.methods.allowance(account, opts.farmAddress).call(),
	                    ])];
	            case 2:
	                _b = _c.sent(), farmingBalance = _b[0], earnedTokens = _b[1], allowance = _b[2];
	                console.log('allowance:', allowance);
	                injectStakingButtons(Number(allowance) > 0);
	                balanceNode = document.getElementById(constants.ids.widget.staked);
	                earnedTokensNode = document.getElementById(constants.ids.widget.earned);
	                harvestButton = document.getElementById(constants.ids.widget.harvestButton);
	                withdrawButton = document.getElementById(constants.ids.widget.withdrawButton);
	                balanceNode.innerText = toFixed(farmingBalance / 1e18) + " " + stakingTokenName;
	                earnedTokensNode.innerText = toFixed(earnedTokens / 1e18) + " " + rewardsTokenName;
	                if (harvestButton) {
	                    if (earnedTokens > 0) {
	                        harvestButton.classList.remove('disabled');
	                    }
	                    else {
	                        harvestButton.classList.add('disabled');
	                    }
	                }
	                if (withdrawButton) {
	                    if (farmingBalance > 0) {
	                        withdrawButton.classList.remove('disabled');
	                    }
	                    else {
	                        withdrawButton.classList.add('disabled');
	                    }
	                }
	                return [3 /*break*/, 4];
	            case 3:
	                err_1 = _c.sent();
	                console.error(err_1);
	                infoModal.open(err_1.message);
	                return [3 /*break*/, 4];
	            case 4: return [2 /*return*/];
	        }
	    });
	}); };
	var harvest = function () { return __awaiter(void 0, void 0, void 0, function () {
	    var _a, contracts, account, harvestButton, res, err_2;
	    return __generator(this, function (_b) {
	        switch (_b.label) {
	            case 0:
	                debug('init harvest');
	                _a = getState(), contracts = _a.contracts, account = _a.account;
	                if (isLoading$2) {
	                    return [2 /*return*/];
	                }
	                if (!account) {
	                    // Vue.prototype.$bus.$emit('open-wallet-modal')
	                    return [2 /*return*/];
	                }
	                if (!contracts.farm) {
	                    infoModal.open('Farm contract is not connected');
	                    return [2 /*return*/];
	                }
	                harvestButton = document.getElementById(constants.ids.widget.harvestButton);
	                _b.label = 1;
	            case 1:
	                _b.trys.push([1, 3, 4, 5]);
	                isLoading$2 = true;
	                harvestButton.innerHTML = "Harvest " + loader();
	                return [4 /*yield*/, contracts.farm.methods.getReward().send({ from: account })];
	            case 2:
	                res = _b.sent();
	                if (res.status) {
	                    infoModal.open('Transaction confirmed!');
	                }
	                getData();
	                return [3 /*break*/, 5];
	            case 3:
	                err_2 = _b.sent();
	                console.error(err_2);
	                infoModal.open(err_2.message);
	                return [3 /*break*/, 5];
	            case 4:
	                isLoading$2 = false;
	                harvestButton.innerHTML = 'Harvest';
	                return [7 /*endfinally*/];
	            case 5: return [2 /*return*/];
	        }
	    });
	}); };
	var approve = function () { return __awaiter(void 0, void 0, void 0, function () {
	    var _a, opts, web3, contracts, account, spender, value, res, err_3;
	    return __generator(this, function (_b) {
	        switch (_b.label) {
	            case 0:
	                debug('init approve');
	                _a = getState(), opts = _a.opts, web3 = _a.web3, contracts = _a.contracts, account = _a.account;
	                if (isLoading$2) {
	                    return [2 /*return*/];
	                }
	                if (!account) {
	                    // Vue.prototype.$bus.$emit('open-wallet-modal')
	                    return [2 /*return*/];
	                }
	                if (!contracts.staking) {
	                    infoModal.open('Staking contract is not connected');
	                    return [2 /*return*/];
	                }
	                _b.label = 1;
	            case 1:
	                _b.trys.push([1, 3, 4, 5]);
	                isLoading$2 = true;
	                document.getElementById(constants.ids.widget.approveButton).innerHTML = "Approve " + loader();
	                spender = opts.farmAddress;
	                value = web3.utils.toBN('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff');
	                return [4 /*yield*/, contracts.staking.methods.approve(spender, value).send({ from: account })];
	            case 2:
	                res = _b.sent();
	                if (res.status) {
	                    infoModal.open('Transaction confirmed!');
	                }
	                getData();
	                return [3 /*break*/, 5];
	            case 3:
	                err_3 = _b.sent();
	                console.error(err_3);
	                infoModal.open(err_3.message);
	                return [3 /*break*/, 5];
	            case 4:
	                isLoading$2 = false;
	                document.getElementById(constants.ids.widget.approveButton).innerHTML = 'Approve';
	                return [7 /*endfinally*/];
	            case 5: return [2 /*return*/];
	        }
	    });
	}); };
	var connectWithdrawButton = function () {
	    var opts = getState().opts;
	    var withdrawButton = document.getElementById(constants.ids.widget.withdrawButton);
	    if (opts.withdrawButtonTitle) {
	        withdrawButton.innerText = opts.withdrawButtonTitle;
	    }
	    withdrawButton.addEventListener('click', function () {
	        if (!withdrawButton.classList.contains('disabled')) {
	            withdrawForm.show();
	        }
	    });
	};
	var connectDepositButton = function () {
	    var opts = getState().opts;
	    var depositButton = document.getElementById(constants.ids.widget.depositButton);
	    if (opts.depositButtonTitle) {
	        depositButton.innerText = opts.depositButtonTitle;
	    }
	    depositButton.addEventListener('click', function () {
	        depositForm.show();
	    });
	};
	var connectApproveButton = function () {
	    var approveButton = document.getElementById(constants.ids.widget.approveButton);
	    approveButton.addEventListener('click', function () {
	        approve();
	    });
	};
	var injectStakingButtons = function (isApproved) {
	    var node = document.getElementById(constants.ids.widget.lpsButtons);
	    if (isApproved) {
	        node.innerHTML = depositAndWithdrawButtonsHtml;
	        connectDepositButton();
	        connectWithdrawButton();
	    }
	    else {
	        node.innerHTML = approveButtonHtml;
	        connectApproveButton();
	    }
	};
	var initHarvest = function () {
	    var opts = getState().opts;
	    var harvestButton = document.getElementById(constants.ids.widget.harvestButton);
	    if (opts.harvestButtonTitle) {
	        harvestButton.innerText = opts.harvestButtonTitle;
	    }
	    harvestButton.addEventListener('click', function () {
	        if (!harvestButton.classList.contains('disabled')) {
	            harvest();
	        }
	    });
	};
	var injectHtml = function () {
	    document.getElementById(constants.ids.widgetRoot).innerHTML = html$3;
	    depositForm.addListeners();
	    withdrawForm.addListeners();
	    initHarvest();
	    events.subscribe('setup web3', getData);
	    events.subscribe('deposit success', getData);
	    events.subscribe('withdraw success', getData);
	};
	var showError = function (error) {
	    document.getElementById(constants.ids.widgetRoot).innerHTML = errorHtml(error);
	};
	var widget = {
	    injectHtml: injectHtml,
	    showError: showError,
	    getData: getData,
	};

	var html$4 = function (networkName) { return "\n  <div class=\"farmfactory-overlay\">\n    <div class=\"farmfactory-modal\">\n      <button class=\"farmfactory-closeButton\" id=\"" + constants.ids.wrongNetworkModal.closeButton + "\">\n        <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"32\" height=\"32\" fill=\"none\" viewBox=\"0 0 32 32\">\n          <path stroke=\"currentColor\" stroke-width=\"2\" d=\"M9 9l7 6.99L23 9l-6.99 7L23 23l-7-6.99L9 23l6.99-7L9 9z\" opacity=\".9\"/>\n        </svg>\n      </button>\n      <div class=\"farmfactory-inner\">\n        Please open your metamask and change network to <b>" + networkName + "</b>.\n      </div>\n    </div>\n  </div>\n"; };
	var open$1 = function () {
	    var opts = getState().opts;
	    document.getElementById(constants.ids.modalsRoot).innerHTML = html$4(opts.networkName.toUpperCase);
	    document.getElementById(constants.ids.wrongNetworkModal.closeButton).addEventListener('click', function () {
	        close$1();
	    });
	};
	var close$1 = function () {
	    document.getElementById(constants.ids.modalsRoot).innerHTML = '';
	};
	var wrongNetworkModal = {
	    open: open$1,
	    close: close$1,
	};

	var abis = {};
	abis.farm = [{ "inputs": [{ "internalType": "address", "name": "_rewardsToken", "type": "address" }, { "internalType": "address", "name": "_stakingToken", "type": "address" }, { "internalType": "uint256", "name": "_rewardsDuration", "type": "uint256" }], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "account", "type": "address" }], "name": "Paused", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "token", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "Recovered", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256", "name": "reward", "type": "uint256" }], "name": "RewardAdded", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "reward", "type": "uint256" }], "name": "RewardPaid", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256", "name": "newDuration", "type": "uint256" }], "name": "RewardsDurationUpdated", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "Staked", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "account", "type": "address" }], "name": "Unpaused", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "user", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "Withdrawn", "type": "event" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "earned", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "exit", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "getReward", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "getRewardForDuration", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "lastTimeRewardApplicable", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "lastUpdateTime", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "a", "type": "uint256" }, { "internalType": "uint256", "name": "b", "type": "uint256" }], "name": "min", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "pure", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "reward", "type": "uint256" }], "name": "notifyRewardAmount", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "paused", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "periodFinish", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "tokenAddress", "type": "address" }, { "internalType": "uint256", "name": "tokenAmount", "type": "uint256" }], "name": "recoverERC20", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "rewardPerToken", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "rewardPerTokenStored", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "rewardRate", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "rewards", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "rewardsDuration", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "rewardsToken", "outputs": [{ "internalType": "contract IERC20", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_rewardsDuration", "type": "uint256" }], "name": "setRewardsDuration", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "stake", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "stakingToken", "outputs": [{ "internalType": "contract IERC20", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "userRewardPerTokenPaid", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "withdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function" }];
	abis.rewards = [{ "constant": true, "inputs": [], "name": "name", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "spender", "type": "address" }, { "name": "value", "type": "uint256" }], "name": "approve", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "from", "type": "address" }, { "name": "to", "type": "address" }, { "name": "value", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "_spender", "type": "address" }, { "name": "_value", "type": "uint256" }, { "name": "_extraData", "type": "string" }], "name": "approveAndCall", "outputs": [{ "name": "success", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [{ "name": "", "type": "uint8" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "spender", "type": "address" }, { "name": "addedValue", "type": "uint256" }], "name": "increaseAllowance", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "to", "type": "address" }, { "name": "value", "type": "uint256" }], "name": "mint", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "value", "type": "uint256" }], "name": "burn", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "from", "type": "address" }], "name": "getAvailableBalance", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "tokensMinted", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "owner", "type": "address" }], "name": "balanceOf", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "from", "type": "address" }, { "name": "value", "type": "uint256" }], "name": "burnFrom", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "account", "type": "address" }], "name": "addMinter", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [], "name": "renounceMinter", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "spender", "type": "address" }, { "name": "subtractedValue", "type": "uint256" }], "name": "decreaseAllowance", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "name": "to", "type": "address" }, { "name": "value", "type": "uint256" }], "name": "transfer", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "name": "account", "type": "address" }], "name": "isMinter", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "owner", "type": "address" }], "name": "freezeFor", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "owner", "type": "address" }], "name": "freezeOf", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" }, { "name": "_unfreezeTimestamp", "type": "uint256" }, { "name": "_subsequentUnlock", "type": "bool" }], "name": "mintWithFreeze", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "maxSupply", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "name": "owner", "type": "address" }, { "name": "spender", "type": "address" }], "name": "allowance", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "account", "type": "address" }], "name": "MinterAdded", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "account", "type": "address" }], "name": "MinterRemoved", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "from", "type": "address" }, { "indexed": true, "name": "to", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "owner", "type": "address" }, { "indexed": true, "name": "spender", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" }], "name": "Approval", "type": "event" }];
	abis.staking = abis.rewards;
	var createContract = function (type, web3) {
	    var opts = getState().opts;
	    var address = opts[type + "Address"];
	    var abi = abis[type];
	    return new web3.eth.Contract(abi, address);
	};
	var createContracts = function (web3) { return __awaiter(void 0, void 0, void 0, function () {
	    return __generator(this, function (_a) {
	        return [2 /*return*/, Promise.all([
	                createContract('farm', web3),
	                createContract('rewards', web3),
	                createContract('staking', web3),
	            ])
	                .then(function (_a) {
	                var farm = _a[0], rewards = _a[1], staking = _a[2];
	                return ({
	                    farm: farm,
	                    rewards: rewards,
	                    staking: staking,
	                });
	            })];
	    });
	}); };

	var setupWeb3 = function () { return __awaiter(void 0, void 0, void 0, function () {
	    var account, web3, contracts, stakingTokenName, rewardsTokenName;
	    return __generator(this, function (_a) {
	        switch (_a.label) {
	            case 0:
	                account = getState().account;
	                if (!account) {
	                    return [2 /*return*/];
	                }
	                web3 = new window.Web3(window.Web3.givenProvider || window.ethereum);
	                return [4 /*yield*/, createContracts(web3)];
	            case 1:
	                contracts = _a.sent();
	                return [4 /*yield*/, contracts.staking.methods.symbol().call()];
	            case 2:
	                stakingTokenName = _a.sent();
	                return [4 /*yield*/, contracts.rewards.methods.symbol().call()];
	            case 3:
	                rewardsTokenName = _a.sent();
	                setState({
	                    web3: web3,
	                    contracts: contracts,
	                    stakingTokenName: stakingTokenName,
	                    rewardsTokenName: rewardsTokenName,
	                });
	                events.dispatch('setup web3');
	                return [2 /*return*/];
	        }
	    });
	}); };

	var isLoading$3 = false;
	var html$5 = "\n  <div class=\"farmfactory-overlay\">\n    <div class=\"farmfactory-modal\">\n      <button class=\"farmfactory-closeButton\" id=\"" + constants.ids.connectModal.closeButton + "\">\n        <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"32\" height=\"32\" fill=\"none\" viewBox=\"0 0 32 32\">\n          <path stroke=\"currentColor\" stroke-width=\"2\" d=\"M9 9l7 6.99L23 9l-6.99 7L23 23l-7-6.99L9 23l6.99-7L9 9z\" opacity=\".9\"/>\n        </svg>\n      </button>\n      <div class=\"farmfactory-inner\">\n        <img class=\"farmfactory-svgLogo\" src=\"https://metamask.io/images/mm-logo.svg\" alt=\"Metamask\" />\n      </div>\n      <div class=\"farmfactory-footer\">\n        <button class=\"farmfactory-button yellow\" id=\"" + constants.ids.connectModal.connectButton + "\">Connect</button>\n        <button class=\"farmfactory-button gray\" id=\"" + constants.ids.connectModal.cancelButton + "\">Cancel</button>\n      </div>\n    </div>\n  </div>\n";
	var connectMetamask = function () { return __awaiter(void 0, void 0, void 0, function () {
	    var cancelButton, connectButton, accounts, err_1;
	    return __generator(this, function (_a) {
	        switch (_a.label) {
	            case 0:
	                if (isLoading$3) {
	                    return [2 /*return*/];
	                }
	                cancelButton = document.getElementById(constants.ids.connectModal.cancelButton);
	                connectButton = document.getElementById(constants.ids.connectModal.connectButton);
	                _a.label = 1;
	            case 1:
	                _a.trys.push([1, 5, 6, 7]);
	                isLoading$3 = true;
	                cancelButton.classList.add('disabled');
	                connectButton.innerHTML = "Connect " + loader();
	                return [4 /*yield*/, window.ethereum.request({ method: 'eth_requestAccounts' })];
	            case 2:
	                accounts = _a.sent();
	                setState({ account: accounts[0] });
	                localStorage.setItem('ff-account-unlocked', 'true');
	                return [4 /*yield*/, window.ethereum.enable()];
	            case 3:
	                _a.sent();
	                return [4 /*yield*/, setupWeb3()];
	            case 4:
	                _a.sent();
	                close$2();
	                return [3 /*break*/, 7];
	            case 5:
	                err_1 = _a.sent();
	                console.error(err_1);
	                infoModal.open(err_1.message);
	                return [3 /*break*/, 7];
	            case 6:
	                isLoading$3 = false;
	                cancelButton.classList.remove('disabled');
	                connectButton.innerHTML = 'Connect';
	                return [7 /*endfinally*/];
	            case 7: return [2 /*return*/];
	        }
	    });
	}); };
	var open$2 = function () {
	    document.getElementById(constants.ids.modalsRoot).innerHTML = html$5;
	    var connectButton = document.getElementById(constants.ids.connectModal.connectButton);
	    var cancelButton = document.getElementById(constants.ids.connectModal.cancelButton);
	    var closeButton = document.getElementById(constants.ids.connectModal.closeButton);
	    connectButton.addEventListener('click', connectMetamask);
	    cancelButton.addEventListener('click', close$2);
	    closeButton.addEventListener('click', close$2);
	};
	var close$2 = function () {
	    document.getElementById(constants.ids.modalsRoot).innerHTML = '';
	};
	var connectModal = {
	    open: open$2,
	    close: close$2,
	};

	var interval;
	var init = function () { return __awaiter(void 0, void 0, void 0, function () {
	    var _a, opts, contracts, root, web3, farm, farmingFinishDate, finishDate;
	    return __generator(this, function (_b) {
	        switch (_b.label) {
	            case 0:
	                _a = getState(), opts = _a.opts, contracts = _a.contracts;
	                root = document.getElementById(constants.ids.timerRoot);
	                if (!root) {
	                    return [2 /*return*/];
	                }
	                if (!!contracts) return [3 /*break*/, 2];
	                web3 = new Web3(constants.infuraNetworks[opts.networkName]);
	                return [4 /*yield*/, createContract('farm', web3)];
	            case 1:
	                farm = _b.sent();
	                contracts = {
	                    farm: farm,
	                };
	                _b.label = 2;
	            case 2: return [4 /*yield*/, contracts.farm.methods.periodFinish().call()];
	            case 3:
	                farmingFinishDate = _b.sent();
	                finishDate = Number(farmingFinishDate.toString());
	                if (finishDate - Date.now() / 1000 > 0) {
	                    if (interval) {
	                        clearInterval(interval);
	                    }
	                    interval = setInterval(function () {
	                        var delta = Math.floor((finishDate * 1000 - Date.now()) / 1000);
	                        var days = Math.floor(delta / 86400);
	                        delta -= days * 86400;
	                        var hours = Math.floor(delta / 3600) % 24;
	                        delta -= hours * 3600;
	                        var minutes = Math.floor(delta / 60) % 60;
	                        delta -= minutes * 60;
	                        var seconds = delta % 60;
	                        var timeLeft = (days < 10 ? "0" + days : days) + ":" + (hours < 10 ? "0" + hours : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds);
	                        root.innerText = timeLeft;
	                    }, 1000);
	                }
	                else {
	                    root.innerText = opts.timesUpMessage || 'Farming not started yet';
	                }
	                return [2 /*return*/];
	        }
	    });
	}); };
	var injectHtml$1 = function () {
	    var root = document.getElementById(constants.ids.timerRoot);
	    if (root) {
	        root.innerText = '--:--:--:--';
	    }
	};
	var timer = {
	    injectHtml: injectHtml$1,
	    init: init,
	};

	var accountUnlockedStorageKey = 'ff-account-unlocked';
	var appendModalsHtml = function () {
	    var modalsNode = document.createElement('div');
	    var infoModalNode = document.createElement('div');
	    modalsNode.setAttribute('id', constants.ids.modalsRoot);
	    infoModalNode.setAttribute('id', constants.ids.infoModalRoot);
	    document.body.appendChild(modalsNode);
	    document.body.appendChild(infoModalNode);
	};
	var connectWeb3 = function () { return __awaiter(void 0, void 0, void 0, function () {
	    return __generator(this, function (_a) {
	        switch (_a.label) {
	            case 0: return [4 /*yield*/, setupWeb3()];
	            case 1:
	                _a.sent();
	                timer.init();
	                return [2 /*return*/];
	        }
	    });
	}); };
	var initMetamask = function () { return __awaiter(void 0, void 0, void 0, function () {
	    var opts, activeNetwork, isAccountUnlocked, accounts, err_1;
	    return __generator(this, function (_a) {
	        switch (_a.label) {
	            case 0:
	                opts = getState().opts;
	                activeNetwork = ({
	                    1: 'mainnet',
	                    3: 'ropsten',
	                    42: 'kovan',
	                })[window.ethereum.networkVersion];
	                if (opts.networkName.toLowerCase() !== activeNetwork.toLowerCase()) {
	                    wrongNetworkModal.open();
	                    return [2 /*return*/];
	                }
	                isAccountUnlocked = localStorage.getItem(accountUnlockedStorageKey) === 'true';
	                if (!isAccountUnlocked) return [3 /*break*/, 5];
	                _a.label = 1;
	            case 1:
	                _a.trys.push([1, 3, , 4]);
	                return [4 /*yield*/, window.ethereum.request({ method: 'eth_accounts' })];
	            case 2:
	                accounts = _a.sent();
	                if (!accounts[0]) {
	                    infoModal.open('Please create at least 1 account in MetaMask and reload the page');
	                }
	                else {
	                    setState({ account: accounts[0] });
	                }
	                return [3 /*break*/, 4];
	            case 3:
	                err_1 = _a.sent();
	                console.error(err_1);
	                localStorage.removeItem(accountUnlockedStorageKey);
	                connectModal.open();
	                return [3 /*break*/, 4];
	            case 4: return [3 /*break*/, 6];
	            case 5:
	                connectModal.open();
	                _a.label = 6;
	            case 6: return [2 /*return*/];
	        }
	    });
	}); };
	var connectMetamask$1 = function () { return __awaiter(void 0, void 0, void 0, function () {
	    return __generator(this, function (_a) {
	        switch (_a.label) {
	            case 0:
	                if (!window.ethereum) {
	                    widget.showError("\n      <div class=\"install-metamask\">\n        <img src=\"https://swaponline.github.io/images/metamask_45038d.svg\" /><br />\n        Please install MetaMask\n      </div>\n    ");
	                    return [2 /*return*/];
	                }
	                return [4 /*yield*/, initMetamask()];
	            case 1:
	                _a.sent();
	                window.ethereum.on('networkChanged', initMetamask);
	                return [2 /*return*/];
	        }
	    });
	}); };
	var loadScript = function (src) { return new Promise(function (resolve, reject) {
	    var script = document.createElement('script');
	    script.onload = resolve;
	    script.onerror = reject;
	    script.src = src;
	    document.head.appendChild(script);
	}); };
	var init$1 = function (opts) { return __awaiter(void 0, void 0, void 0, function () {
	    var networkName, farmAddress, rewardsAddress, stakingAddress, widgetRoot;
	    return __generator(this, function (_a) {
	        switch (_a.label) {
	            case 0:
	                networkName = opts.networkName, farmAddress = opts.farmAddress, rewardsAddress = opts.rewardsAddress, stakingAddress = opts.stakingAddress;
	                setState({ opts: opts });
	                appendModalsHtml();
	                if (!networkName || !farmAddress || !rewardsAddress || !stakingAddress) {
	                    infoModal.open('Check farmFactory.init(options). Required options: networkName, farmAddress, rewardsAddress, stakingAddress.');
	                    return [2 /*return*/];
	                }
	                widgetRoot = document.getElementById(constants.ids.widgetRoot);
	                if (!widgetRoot) {
	                    infoModal.open('Template variable not found! Please use {farmfactory-widget-root}.');
	                    return [2 /*return*/];
	                }
	                widget.injectHtml();
	                timer.injectHtml();
	                return [4 /*yield*/, connectMetamask$1()];
	            case 1:
	                _a.sent();
	                return [4 /*yield*/, loadScript('https://cdnjs.cloudflare.com/ajax/libs/web3/1.3.1/web3.min.js')];
	            case 2:
	                _a.sent();
	                return [4 /*yield*/, connectWeb3()];
	            case 3:
	                _a.sent();
	                return [2 /*return*/];
	        }
	    });
	}); };
	var farmFactory = {
	    init: init$1,
	};

	return farmFactory;

}());
