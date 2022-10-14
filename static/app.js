/* settings */
const form_auto_refresh_after_ms = 1000;
const number_of_fields = 4;
const input_field_ids = ["#guest_name", "#guest_email", "#host_id", "#guest_photo"];

/* flags and objects */
let is_dirty = false;
let last_activity_at = Date.now();
let current_field = 0;


/* functions */
let reset_form = (check_dirty_expired = false) => {
    // Todo:
    if (check_dirty_expired) { }
    current_field = 0;
    is_dirty = false;
    last_activity_at = Date.now();
    for(let n=0;n<number_of_fields;n++){
        if (input_field_ids[n] != "#guest_photo") {
            document.querySelector(input_field_ids[n]).value = "";
        } else {
            // Todo: Clear photo
        }
    }

}

let renew_last_activity_at = () => { last_activity_at = Date.now(); }

let send_to_storge = () => { 
    //Todo: 
}

let validate = (input_fields, current_field) => {
    if (input_field_ids[current_field] == "#guest_photo") {
        return true;
    } else {
        return ((input_fields[current_field].value || "") != "")
    }

}

let focus_field = (field_number) => {
    x = document.querySelectorAll("label");
    x.forEach((xx) => {
        if ("#" + xx.getAttribute("for") == input_field_ids[current_field])
            xx.classList.add("blink")
        else
            xx.classList.remove("blink")
    });
}

let show_message = (msg) => console.log;
let get_confirm = (msg) => { return false; }

/* loading sequence / register events */
let input_fields = []
for (let i = 0; i < number_of_fields - 1; i++) {
    input_fields[i] = document.querySelector(input_field_ids[i]);
}

let VirtualKeyboard = window.SimpleKeyboard.default;

let keyboard = new VirtualKeyboard({
    onChange: (input) => {
        document.querySelector(input_field_ids[current_field]).value = input;
    },
    onKeyPress: (button) => {
        /* Handle the enter button*/
        if (button === "{enter}") next_action();
        /* Handle the shift and caps lock buttons*/
        if (button === "{shift}" || button === "{lock}") {
            let currentLayout = keyboard.options.layoutName;
            let shiftToggle = currentLayout === "default" ? "shift" : "default";
            keyboard.setOptions({
                layoutName: shiftToggle,
            });
        }
    }
});

let next_action_handler = (e) => {
    if (current_field < number_of_fields ) {
        // Todo: return and show msg if current_field is not validated (skipping following)
        if (!validate(input_fields, current_field)) {
            show_message("fail");
            focus_field()
            return
        }  else {
            current_field += 1;
            focus_field()
        }
        // load data to virtual keyboard
        if (input_field_ids[current_field] != "#guest_photo") {
            keyboard.setInput(input_fields[current_field].value || "")
        }
        console.log(current_field)
    } else {
        console.log(current_field, "last_field");
        console.log("Sending to storage")
        send_to_storge(input_fields)

    }
}

let prev_action_handler = (e) => {
    if (current_field > 0) {
        current_field -= 1;
        console.log(current_field);
        // load data to virtual keyboard
        if (input_field_ids[current_field] != "#guest_photo") {
            keyboard.setInput(input_fields[current_field].value || "")
        }
    } else {
        console.log(current_field, "first_field");
    }
    focus_field()
}

document.querySelector('#next_action_btn').addEventListener("click", next_action_handler);
document.querySelector('#prev_action_btn').addEventListener("click", prev_action_handler);
document.querySelector('#reset_btn').addEventListener("click", reset_form);
focus_field()





// reset_form(input_fields);
// setInterval(reset_form(true), form_auto_refresh_after_ms);





/**
 * Todo: Update simple-keyboard when host input is changed by clicking filtered list
 */
// for(let n=0;n<number_of_fields;n++){
//     input_fields[n].addEventListener("focus", event => {
//         if (input_field_ids[n] != "#guest_photo") {
//             keyboard.setInput(event.target.value);
//         }
//     });
// }