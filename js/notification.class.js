window.addEventListener("load", function(){
    var notifications = document.createElement("div");
    notifications.id = "notifications";
    document.body.appendChild(notifications);
}, false);

class Notification{
    constructor(message, settings){
        this.message = message;
        if(settings !== undefined){
            if(settings.type !== undefined && (settings.type > -1 && settings.type < 3))
                this.type = settings.type;
            else
                this.type = 1; //warning

            if(settings.timeout !== undefined)
                this.timeout = settings.timeout;
            else
                this.timeout = 2000; //2 seconds

            if(settings.onClose !== undefined)
                this.onClose = settings.onClose;
        }else{
            this.type = 1;
            this.timeout = 2000;
        }
    }

    show(){
        var icon = document.createElement("i");
        icon.setAttribute("aria-hidden", "true");
        switch(this.type){
            case 0:
                icon.className = "fa fa-check-circle green icon";
            break;
            case 2:
                icon.className = "fa fa-exclamation-circle red icon";
            break;
            default:
            case 1:
                icon.className = "fa fa-exclamation-triangle yellow icon";
            break;
        }

        var div = document.createElement("div");
        div.className = "notification";
        var span = document.createElement("span");
        span.appendChild(icon);
        span.appendChild(this.message);
        div.appendChild(span);
        var notification = document.getElementById("notifications").appendChild(div);

        notification.style.display = "block";
        var onClose = this.onClose;
        setTimeout(function(){
            document.getElementById("notifications").removeChild(div);
            if(onClose !== undefined)
                onClose();
        }, this.timeout);
    }
};
