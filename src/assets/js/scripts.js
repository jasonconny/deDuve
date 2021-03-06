var $numbers, $notes, $tooltip, $tooltipContent;

$numbers = $('sup');
$notes = $('ol').last().children();
$tooltip = $('.tooltip');
$tooltipContent = $('.tooltip .tooltip-content');

$(document).ready(function() {
    $numbers.on('click', function(e) {
        var $target, note;
        $target = e.target;
        note = $notes.get($target.innerText - 1).innerHTML;
        $tooltipContent.html('<p>' + note + '</p>');
        $tooltip.fadeIn();
    });

    $tooltip.on('click', function(e) {
        $tooltipContent.html('');
        $tooltip.fadeOut();
    });
});