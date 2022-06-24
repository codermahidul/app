export default function AddEven(selector, type, fun) {
    const elements = document.querySelectorAll(selector);

    for (let i = 0; i < elements.length; i++) {
        elements[i].addEventListener(type, fun);
    }
}