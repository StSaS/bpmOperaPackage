define("ClientMessageBridge", ["ConfigurationConstants"],
	function(ConfigurationConstants) {
		return {
			// Сообщения.
			messages: {
				//Имя сообщения.
				"NewUserDetail": {
					// Тип сообщения — широковещательное, без указания конкретного подписчика.
					"mode": Terrasoft.MessageMode.BROADCAST,
					// Направление сообщения — публикация.
					"direction": Terrasoft.MessageDirectionType.PUBLISH
				}
			},
			methods: {
				// Инициализация схемы.
				init: function() {
					// Вызов родительского метода.
					this.callParent(arguments);
					// Добавление нового конфигурационного объекта в коллекцию конфигурационных объектов.
					this.addMessageConfig({
						// Имя сообщения, получаемого по WebSocket.
						sender: "NewUserDetail",
						// Имя сообщения с которым оно будет разослано внутри системы.
						messageName: "NewUserDetail",
						
						isSaveHistory: true
					});
				},
				// Метод, выполняемый после публикации сообщения.
				afterPublishMessage: function(
					// Имя сообщения с которым оно было разослано внутри системы.
					sandboxMessageName,
					// Содержимое сообщения.
					webSocketBody,
					// Результат отправки сообщения.
					result,
					// Конфигурационный объект рассылки сообщения.
					publishConfig) {
						
					//debugger;
					window.console.log(sandboxMessageName);
				}
			}
		};
	}); 