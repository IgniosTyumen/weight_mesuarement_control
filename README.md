# Установка

`npm i`

# Запуск

`npm start`

# Структура проекта

`/assets` - используется для хранения файлов статики (изображения, стили)

`/src/actions` - хранение синхронных Action Creator
 
`/src/actions/AppActions.js` - AC на запуск саги инициализации приложения и включение глобальных режимов

`/src/actions/ChangePreferencesActions.js` - AC для дисаптча визульных настроек пользователей
 
`/src/actions/MapActions.js` - AC для дисаптча параметров карты

`/src/actions/MapFilterActions.js` - AC для дисаптча видимости слоев карты

`/src/actions/OrderActions.js` - AC для дисаптча параметров текущей заявки

`/src/actions/SelectObjectsActions.js` - AC для дисаптча параметров выбранного объекта

`/src/actions/SignsFilterActions.js` - AC для дисаптча фильтрации дорожных знаков

`/src/actions/WaypointActions.js` - AC для дисаптча точек рисования и редактирования маршрута

`/src/api` - endpoint и запросы 


`/src/sagas` - логика асинхронных взаимодействий и сценариев. подробнее про библиотеку по ссылке  https://redux-saga.js.org/

`/src/components` - компоненты React

`/src/components/*DetailsObject` - компоненты React детальной информации (выдвижная панель)

`/src/components/*Layer` - компоненты React для отрисовки на карте 

`/src/components/*Panel` - компоненты React для блоков информации 

`/src/components/*VisionSettings` - компоненты React для кастомизации информации 

`/src/components/*/*Container` - контейнерные компоненты - связанные со стейтом. Инициируют колбэки взаимодействия со стейтом приложения 

`/src/components/*/*` - dumb компоненты - компоненты, отрисовывающиеся в приложении 

# Возможные сложности при сборке

сборка происходит по команде `npm run build:dev`. Пример сборки приложен в папке `weight_control`.

Обратите внимание на относительные пути, указанные в файле `index.html`.

Обновление происходит путем замены собранной статики в папке проекта.

Настроки роутинга запросов находятся в `src/utils/axiosInstance.js` 


 
 
