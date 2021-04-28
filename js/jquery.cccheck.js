/*!
 * jquery.cccheck v1.0.10
 * measure password strength
 * https://github.com/RuanAragao/cccheck
 * MIT License
 * by Ruan Aragão
 */
/**
 * @description Gets Credit Card Label
 * @param {number} ccNumberMask cc number
 */
 function getCCLabel(ccNumberMask) {
  var creditCardsRegex = {
      visa: /^4[0-9]{0}?/,
      master: /5[0-9]{0}?/,
      jcb: /3[0-9]{0}?/,
      union: /6[0-9]{0}?/
    },
    creditCards = [
      "visa",
      "master",
      "jcb",
      "union"
    ],
    regexes = [],
    ccNumber = ccNumberMask.replace(/-/gi, "");

  var i = 0;
  var len = creditCards.length;
  for (; i < len; i++) {
    var ccValue = creditCards[i]
    var ccRegex = {
      regex: creditCardsRegex[ccValue],
      label: ccValue,
    };
    regexes.push(ccRegex);
  }

  for (var i = 0; i < regexes.length; i++) {
    if (regexes[i].regex.test(ccNumber)) return regexes[i].label;
  }
  return false;
}

function myTrim(x) {
  return x.replace(/\s/g,'')
}

(function ($) {
  $.cccheck = function cccheck(settings) {
    var config = {
        // Config local
        inputCCNumber: "#cc-number",
        elementShowLabel: "#show-cc-label",
      },
      nodeNumber = $(config.inputCCNumber),
      nodeLabel = $(config.elementShowLabel);

    if (settings) {
      settings = jQuery.extend(config, settings);
    }

    nodeNumber.keyup(function (e) {
      var inputVal = nodeNumber.val();
      var cardLabel = getCCLabel( myTrim( inputVal ) );

      if( settings.cGroup ){
        // cgroup=1 -> Visa, Master, JCB
        // cgroup=2 -> TPN, Unionpay
        var cGroup1List = ['visa', 'master', 'jcb']
        var cGroup2List = ['union']

        if( cardLabel && ( settings.cGroup === '1' && cGroup1List.indexOf(cardLabel) == -1 )
        || ( settings.cGroup === '2' && cGroup2List.indexOf(cardLabel) == -1 ) ){
            alert('หากต้องการชำระด้วยบัตร '+ cardLabel +' ให้ย้อนกลับไปหน้าแรก')
            return false
        }

        
      }

      nodeLabel.html(
        '<i class="i-icon-payment i-icon-card-' + cardLabel + '"></i>'
      );
    });

    return this;
  };
})(jQuery);
