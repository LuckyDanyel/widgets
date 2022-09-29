import { createApp, defineAsyncComponent } from 'vue';
import App from './App.vue';


function init(...data) {
    if(data.length) {
        const nameWidget = data[0];
        const settings = data[1];
        factoryWidget(nameWidget, settings);
    } else {
        let massiveWidgetsSettings = window.travelata?.queue || [];
        massiveWidgetsSettings.forEach(widgetsSettings => {
            const nameWidget = widgetsSettings[0];
            const settings = widgetsSettings[1];
            factoryWidget(nameWidget, settings);
        });
        massiveWidgetsSettings = [];
    }
}

function factoryWidget(nameWidget, settings) {
    const { id, text } = settings;
    const widgets = {
        'tizer':  './helloWorld.vue',
        'tizer2': './helloWorld1.vue',
        'tizer3': './helloWorld2.vue',
    }
    const widgetPath = widgets[nameWidget];
    const asyncComponent = defineAsyncComponent(() => import(/* webpackChunkName: "widget" */`${widgetPath}`));
    const app = createApp(App);
    app.component('async-component', asyncComponent);
    app.provide('text', text);
    app.mount(`#${id}`);
}

init();
window.travelata = init;