// @Dev Clément Caillat
$(document).ready(() => {
	getRates();
});

function getRates() {
	$.ajax({
        url: "http://localhost:5500/rate",
        dataType: "json",
        type: "GET",
        success: data => {
                showRate(data.rates);
            // console.log(data.rates);
        },
        error: error => {
            console.error(error);
        }
    })
}

function showRate(rate) {
    
    let variation_status; 

    let sign = '';

    if (rate.variation != 0) {
        if (Math.sign(rate.variation) == 1){
            variation_status = "rate-bull";
            sign = '+';
        } else if (Math.sign(rate.variation) == -1) {
            variation_status = "rate-bear";
        }
    } else if(rate.variation == 0.0) {
        variation_status = "";
    }

    console.log(sign);

    let card = $(`<div class="rate-card">
        <h3>${rate.name}</h3>
        <table>
            <tr>
                <td class="rate-label">Gramme</td>
                <td class="rate-value">${rate.g} €</td>
            </tr>
            <tr>
                <td class="rate-label">Once</td>
                <td class="rate-value">${rate.oz} €</td>
                <td class="rate-value"><input type="number" id="update-or-rate-input" data-id='${rate.id}' min=0 value="${rate.oz}"></td>
            </tr>
            <tr>
                <td class="rate-label">Kilogramme</td>
                <td class="rate-value">${rate.kg} €</td>
            </tr>
            <tr>
                <td class="rate-label">Variation</td>
                <td class="rate-value ${variation_status}">${sign}${parseFloat(rate.variation).toFixed(2)} %</td>
            </tr>
        </table>
        <p class="rate-update_date">${rate.last_update}</p>
        <button onclick="updateRate()"class="btn btn-info" id="update-or-rate-button">Modifier</button>
    </div>`);
    $('.rate-container').append(card);
}

