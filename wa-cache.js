export function CachePush(path) {
//  adds image given by path to the DOM as id 'kittyimg'
    let kittyEl = document.getElementById('kittyimg')
    if(kittyEl)
        return kittyEl.setAttribute("src", path);

    let fileref = document.createElement('img');
    fileref.setAttribute('id', 'kittyimg')
    fileref.setAttribute("src", path);
    fileref.setAttribute('style', "width:50%;height:50%;")
    // fileref.setAttribute('rotate', '90')//  style="width:500px;height:600px;"
    // fileref.setAttribute(' image-orientation', 'from-image;')
    document.body.appendChild(fileref);   
}

    