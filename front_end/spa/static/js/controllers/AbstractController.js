export default class {
    postHeaders(payload) {
        return {
            method: "POST",
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify(payload)
        }
    }

    deleteHeaders(payload) {
        return {
            method: "DELETE",
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify(payload)
        }
    }

    triggerNavigate(targetPath) {
        const temp = document.createElement('temp');
        temp.href = targetPath;
        document.querySelector('#app').appendChild(temp);
        
        const navEvent = new Event("navigate", {"bubbles":true});        
        temp.dispatchEvent(navEvent);
    }
}