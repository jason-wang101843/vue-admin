import '@u/loading/index.less'

function globalLoading() {
    this.mask = null;
    this.init()
}

globalLoading.prototype.init = function () {
    const mask =document.createElement('div')
    mask.className = 'global-loading-mask'
    const content=document.createElement('div')
    content.className = 'loading-content'
    mask.appendChild(content)
    for(let i=0;i<4;i++){
        content.appendChild(document.createElement('div')) 
    }
    document.body.appendChild(mask)
    this.mask=mask
}
globalLoading.prototype.open = function () {
    this.mask.classList.remove('close')

}

globalLoading.prototype.close = function () {
    this.mask.classList.add('close')
}
//创建全局loading单例模式
globalLoading.produceInstance=function(){
    let LoadingInstance = null;
    return function (){
        if(!LoadingInstance){
            LoadingInstance = new globalLoading();
        }
        return LoadingInstance;
    }
}

export default globalLoading.produceInstance()();

