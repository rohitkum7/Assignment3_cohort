document.addEventListener("DOMContentLoaded", function () {
  //Accessing the elements
  const imageElement = document.querySelector(".img");
  const quoteElement = document.querySelector(".blockquote");
  const writerElement = document.querySelector(".blockquote-footer");
  const copyButtonElement = document.getElementById("copy_to_clipboard");
  const elementToCapture = document.getElementById("quote_img");
  const exportButtonElement = document.getElementById("export_btn");

  //Bootstrap Script to popover in right side when clicked on the copy to clipboard button

  const popoverTriggerList = document.querySelectorAll(
    '[data-bs-toggle="popover"]'
  );
  const popoverList = [...popoverTriggerList].map(
    (popoverTriggerEl) => new bootstrap.Popover(popoverTriggerEl)
  );

  //Create a function to generate random quote

  const getQuote = async function () {
    const res = await fetch(
      "https://api.freeapi.app/api/v1/public/quotes/quote/random"
    );
    const { data } = await res.json();

    console.log(data);

    quoteElement.firstElementChild.innerText = data.content;
    writerElement.innerHTML = `<cite title="Source Title">${data.author}</cite>`;
  };

  //Create a function to generate random images

  const getImage = async function () {
    const res = await fetch("https://picsum.photos/200/300");
    // const image = await res.json();
    console.log(res.url);
    imageElement.src = res.url;
  };

  //Added a button, to get new random quote and images

  document.getElementById("new_quote_btn").addEventListener("click", () => {
    getQuote();
    getImage();
  });

  //Create a function to copy the url on the clipboard

  const copyURL = function () {
    navigator.clipboard.writeText(document.baseURI);
  };

  //Added a button, to copy the url on the clipboard

  copyButtonElement.addEventListener("click", copyURL);

  //Created a button to download the screenshot of the image, using html2Canvas

  //Export Image
  exportButtonElement.addEventListener("click", function () {
    html2canvas(elementToCapture, {
      allowTaint: true,
      useCORS: true,
    }).then((canvas) => {
      const downloadLink = document.createElement("a");
      downloadLink.href = canvas.toDataURL("image/png");
      downloadLink.download = "screenshot.png";
      downloadLink.click();
    });
  });
});
