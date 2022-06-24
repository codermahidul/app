import { Fetching } from "../Fetch/Common.js";
import { block, unblock } from "./Block.js";

export const SwalRemoveFetch = (
    url,
    param,
    callBack = () => { },
    title = "Are you sure?",
    text = "Once deleted, you will not be able to recover this  file!",
    icon = "warning",
    cancel = "Your file is safe!",
    param2 = "",
    dangerMode = true,
    textAfterSuccess = "Poof! Your file has been deleted!"
) => {
    swal({
        title,
        text,
        icon,
        buttons: true,
        dangerMode: dangerMode,
    })
        .then((willDelete) => {
            if (willDelete) {
                block();
                Fetching(url, param).then((data) => {
                    unblock();
                    if (data.status === "true") {
                        callBack(param2);
                        swal(textAfterSuccess, {
                            icon: "success",
                        });
                    } else {
                        swal(data.err, {
                            icon: "error",
                        });
                    }
                })

            } else {
                swal(cancel);
            }
        });
}

export const SwalRemoveFetchParams = (
    url,
    param,
    callBack = () => { },
    title = "Are you sure?",
    text = "Once deleted, you will not be able to recover this  file!",
    icon = "warning",
    cancel = "Your file is safe!",
    param1 = "",
    param2 = "",
    dangerMode = true,
    textAfterSuccess = "Poof! Your file has been deleted!"
) => {
    swal({
        title,
        text,
        icon,
        buttons: true,
        dangerMode: dangerMode,
    })
        .then((willDelete) => {
            if (willDelete) {
                block();
                Fetching(url, param).then((data) => {
                    unblock();
                    if (data.status === "true") {
                        callBack(param1, param2);
                        swal(textAfterSuccess, {
                            icon: "success",
                        });
                    } else {
                        swal(data.err, {
                            icon: "error",
                        });
                    }
                })

            } else {
                swal(cancel);
            }
        });
}

export const SwaleError = (text = "Once deleted, you will not be able to recover this  file!", icon = "warning", dangerMode = true) => {
    swal({

        text,
        icon,
        dangerMode: dangerMode,
    })

}

export const SwaleConfirmAction=(action=()=>{},title="Are you sure?",text="",confirm="",cancel="",icon="info")=>{
    swal({
        title,
        text: text,
        icon: icon,
        buttons: true,
        dangerMode: false,
        buttons: [cancel,confirm],
      })
      .then((willDelete) => {
        if (willDelete) {
          action();
        } else {
          swal("ok!");
        }
      });
    
}