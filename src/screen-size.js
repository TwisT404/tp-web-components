class ScreenSize extends HTMLElement {

    connectedCallback() {
        this.attachShadow({ mode: "open" });

        this.render();
        this.$button = this.shadowRoot.querySelector("button");
        this.$unitScreen = document.shadowRoot.querySelector("screen-size");

        console.log(this.$unitScreen);


        this.$button.addEventListener('click', function () {
            this.$unitScreen.setAttribute("unit", "rem");
        });


    }

    attributeChangedCallback(name, oldVal, newVal) {
        this.render();


    }


    disconnectedCallback() {
        console.log("Au revoir!");
    }


    render() {
        this.shadowRoot.innerHTML = `
            <style>
            </style>
            <button class="unitBtn">Changer l'unité</button>
            <p>${this.renderUnitValue()}</p>
        `;
    }

    renderUnitValue() {
        this.$windowPixelSize = window.innerWidth;
        this.$windowRemSize = window.innerWidth / parseInt(getComputedStyle(document.body).getPropertyValue("font-size"));
        this.$valuePrint = '';
        switch (this.getAttribute("unit")) {
            case "px":
                this.$valuePrint = `${this.$windowPixelSize} px`;
                break;
            case "rem":
                this.$valuePrint = `${this.$windowRemSize} rem`;
                break;

            default:
                this.$valuePrint = `${this.$windowPixelSize} px`;
                break;
        }
        return this.$valuePrint;
    }



}
customElements.define("screen-size", ScreenSize);