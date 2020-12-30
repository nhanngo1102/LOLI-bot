const logger = require("../../utils/log.js");

module.exports = function({ api, __GLOBAL, client, models, User, Thread, Currency }) {
	return async function({ event }) {
		if (client.userBanned.has(event.senderID) || client.threadBanned.has(event.threadID)) return;
		let timeStart = Date.now();
		for (let [key, value] of client.events.entries()) {
			if (value.config.eventType.indexOf(event.logMessageType) !== -1) {
				const eventRun = client.events.get(key);
				try {
					eventRun.run({ api, __GLOBAL, client, models, User, Thread, Currency });
					if (__GLOBAL.settings.DEVELOP_MODE == "on") {
						var time = new Date();
						logger(`[ ${time.toLocaleString()} ]Event Executed: ${eventRun.config.name} |  Group: ${threadID} | Process Time: ${(Date.now()) - timeStart}ms`, "[ DEV MODE ]");
					}
				}
				catch (error) {
					logger(error + " at event: " + eventRun.config.name , 2);
				}
				return;
			};
		}
	}
}