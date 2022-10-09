const widgetsApp = {};
async function factoryWidget(nameWidget, settings) {
    const { id, text } = settings;
    const isAppByIdRendered = widgetsApp[id];
    let target = null;
    if(isAppByIdRendered) {
        widgetsApp[id].$destroy();
    } else {
        const element = document.getElementById(id);
        const isElementHasShadowDom = element.attachShadow;
        target = (isElementHasShadowDom) ? element.attachShadow({ mode: 'open' }) : element;
    }
    let component = null;
    if(nameWidget === 'tizer') {
        component = await import(/* webpackChunkName: "widgetType1" */'./components/widgetType1/helloWorld.svelte');
    } else if(nameWidget ==='tizer1') {
        component = await import(/* webpackChunkName: "widgetType2" */'./components/widgetType2/helloWorld1.svelte');
    }
    console.log(component);
    if(component) {
        const App = component.default;
        widgetsApp[id] = new App({
            target,
            props: {
                target,
            }
        })
    }
}
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
            init(nameWidget, settings);
        });
        massiveWidgetsSettings = [];
    }
}
    
    init();
    window.travelata = init;