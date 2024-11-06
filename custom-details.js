class CustomDetails extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: "open"});

        //Récupérer les élements du template
        const template = document.getElementById("custom-details").content;
        //Afficher dans la nouvelle balise
        this.shadowRoot.appendChild(template.cloneNode(true));


        const details = this.shadowRoot.querySelector("details");

        
        details.addEventListener("keydown", (event)=> {
            if(event.code === "Escape"){
                details.removeAttribute("open");
            }
        });

        details.addEventListener("mouseover", (event)=> {
            details.toggleAttribute("open");
        });

        details.addEventListener("focusin", (event)=> {
            details.toggleAttribute("open");
            console.log('bojour');
        });

        //---------------------- Exo Slot-------------//
        template.innerHTML = `
        <style>
            template{
                
            }
        </style>
        `;


        
    }


    disconnectedCallback() {
        console.log("Annulé");
    }



}
customElements.define("custom-details", CustomDetails);