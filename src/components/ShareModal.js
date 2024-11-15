class ShareModal {
    #backdrop;
    #container;
    #closeModal;
    #shortUrl;
    #btnCopyUrl;
    #btnWhatsapp;
    #btnTwitter;
    #btnEmail;

    constructor() {
        this.#backdrop = document.createElement("div");
        this.#backdrop.className = "modal-backdrop hidden";
        this.#backdrop.innerHTML = `
            <div class="modal-container flex flex-col w-full max-w-[400px] p-6 md:p-8 bg-colorSurface rounded-xl">
                <div class="flex items-center justify-between">
                    <h3 class="text-lg sm:text-xl font-bold">Your Shortened Link</h3>
                    <i class="modal-share-btn-close text-xl text-textSecondary cursor-pointer ri-close-line"></i>
                </div>
                <div class="flex items-center justify-evenly mt-8 gap-3">
                    <button class="modal-share-btn-whatsapp p-5 rounded-full ring-1 ring-inset ring-colorBorder cursor-pointer size-[4.5rem]" title="Share on WhatsApp">
                        <img src="/images/whatsapp.svg" alt="Share on WhatsApp">
                    </button>
                    <button class="modal-share-btn-twitter p-5 rounded-full ring-1 ring-colorBorder cursor-pointer size-[4.5rem]" title="Share on X">
                        <img src="/images/twitter-alt.svg" alt="Share on Twitter">
                    </button>
                    <button class="modal-share-btn-email p-5 rounded-full ring-1 ring-inset ring-colorBorder cursor-pointer size-[4.5rem]" title="Share via Email">
                        <img src="/images/envelope.svg" alt="Share via Email">
                    </button>
                </div>
                <div class="relative mt-8 mb-4 px-4 py-2.5 font-medium bg-colorSurfaceSecondary rounded-md ring-1 ring-inset ring-colorBorder overflow-hidden">
                    <span id="short-url" class="w-full text-xs sm:text-base text-textPrimary overflow-ellipsis overflow-hidden"></span>
                    <i class="modal-share-btn-copy absolute top-0 right-0 flex items-center justify-center h-full px-3 bg-colorPrimary text-white cursor-pointer ri-file-copy-line" title="Copy URL" aria-label="Copy URL"></i>
                </div>
            </div>
        `;
        document.body.prepend(this.#backdrop);
        this.#container = document.querySelector(".modal-container");
        this.#closeModal = document.querySelector(".modal-share-btn-close");
        this.#shortUrl = document.querySelector("#short-url");
        this.#btnCopyUrl = document.querySelector(".modal-share-btn-copy");
        this.#btnWhatsapp = document.querySelector(".modal-share-btn-whatsapp");
        this.#btnTwitter = document.querySelector(".modal-share-btn-twitter");
        this.#btnEmail = document.querySelector(".modal-share-btn-email");
        this.#init();
    }
    #init() {
        this.#closeModal.addEventListener("click", () => this.hideModal());
        this.#btnCopyUrl.addEventListener("click", () => {
            navigator.clipboard.writeText(this.#shortUrl.textContent).then(r => {
                toast.showToast("Copied to clipboard", toast.types.success);
            });
        });
        this.#btnWhatsapp.addEventListener("click", () => {
            window.open(`https://api.whatsapp.com/send?text=${this.#shortUrl.textContent}`);
        });
        this.#btnTwitter.addEventListener("click", () => {
            window.open(`https://twitter.com/intent/tweet?text=${this.#shortUrl.textContent}`);
        });
        this.#btnEmail.addEventListener("click", () => {
            window.open(`mailto:?subject=Shorten URL&body=${this.#shortUrl.textContent}`);
        });
    }
    showModal(url) {
        this.#shortUrl.textContent = url;
        this.#backdrop.classList.remove("animate-fade-out");
        this.#backdrop.classList.remove("hidden");
        this.#backdrop.classList.add("flex");
        this.#container.classList.remove("animate-fade-out");
        this.#container.classList.add("animate-fade-in");
        document.body.style.overflow = "hidden";
    }
    hideModal() {
        this.#container.classList.remove("animate-fade-in");
        this.#container.classList.add("animate-fade-out");
        this.#container.classList.add("animate-fade-out");
        setTimeout(() => {
            this.#backdrop.classList.remove("flex");
            this.#backdrop.classList.add("hidden");
            document.body.style.overflow = "auto";
        }, 300);
    }
}