class CurrentTime extends HTMLElement {
    static observedAttributes;
    connectedCallback() {
        //this.attachShadow({mode: "open"});
        this.render();


        //this.$title = this.shadowRoot.querySelector("p");
        this.$time = this.querySelector("time");
        this.$title = this.querySelector("p");

        setInterval(() => {

            if (this.getAttribute("format") === "utc") {
                this.$time.innerHTML = new Date().toUTCString();

            } else {
                this.$time.innerHTML = new Date().toLocaleString();
            }

            this.renderTitle();

        }, 1000);
    }

    render() {
        //this.shadowRoot.innerHTML =
        this.innerHTML = `
            <div class="currentTime">
                <p class="currentTime__title"></p>
                <time class="currentTime__time"></time>
    
            </div>`;


    }

    renderTitle() {
        this.$title.innerHTML = `Heure ${this.getAttribute("format") === null
            ? "Locale"
            : "UTC"}`;

    }

    attributeChangedCallback(name, oldVal, newVal) {
        this.renderTitle();

    }



    disconnectedCallback() {
        console.log("annulé");
    }
}
customElements.define("current-time", CurrentTime);