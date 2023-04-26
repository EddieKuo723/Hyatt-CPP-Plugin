function onAjaxLoad() {
    // Code that runs after an AJAX request has completed
    const ratesDivs = document.querySelectorAll('div.rates.b-text_copy-5');
    
    for (let j = 0; j < ratesDivs.length; j++) {
      const ratesDiv = ratesDivs[j];
      let ratePoints;
      let ratePrice;
  
      for (let i = 0; i < ratesDiv.children[0].children.length; i++) {
        const childElement = ratesDiv.children[0].children[i];
        if (childElement.getAttribute('data-js') === 'rate-points') {
          const ratePointsText = childElement.textContent.trim();
          ratePoints = parseInt(ratePointsText.replace(',', ''));
        }
      }
      for (let i = 0; i < ratesDiv.children[1].children.length; i++) {
        const childElement = ratesDiv.children[1].children[i];
        if (childElement.getAttribute('data-js') === 'rate-currency') {
          ratePrice = parseFloat(childElement.getAttribute('data-price'));
        }
      }
      if (ratePoints && ratePrice) {
        let rateValue = 100 * ratePrice / ratePoints;
        let roundedNum = rateValue.toFixed(2);
        console.log(roundedNum);
    
        const badge = document.createElement('div');
        // Use the same styling as the publish information in an article's header
        badge.classList.add('b-text_weight-bold');
        // cent per point
        badge.textContent = `🧮 ${roundedNum} Cent Per Point`;
        const date = ratesDiv.querySelector('span')?.parentNode;
        date.insertAdjacentElement('afterend', badge);
      }
      ratePoints = null;
      ratePrice = null;
    
    }
}
// https://stackoverflow.com/questions/28202736/how-to-execute-content-script-after-the-page-is-loaded-completely/28203168
var obs = new MutationObserver(function (mutations, observer) {
    onAjaxLoad();
});
obs.observe(document.body, { childList: true, subtree: true, attributes: false, characterData: false });

  
  

  
  
  