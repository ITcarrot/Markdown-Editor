function add(text){
	text = text[0];
	var input = $('#input-math')[0];
	var endPos = input.selectionEnd;
	if (isNaN(endPos)){
		input.value += ltext + rtext;
	} else {
		input.value = input.value.substring(0, endPos) + text + input.value.substring(endPos, input.value.length);
		input.selectionStart = input.selectionEnd = endPos + text.length;
	}
	update();
}
var preview_timer = -1;
function update(){
	clearTimeout(preview_timer);
	preview_timer = setTimeout(function(){
			$('#view-math').html('$$' + $('#input-math').val() + '$$');
			MathJax.typeset();
		},500);
}
var maths = {"color":[["\\color{Red}{Red}","\\color{Red}{}"],["\\color{Green}{Green}","\\color{Green}{}"],["\\color{Blue}{Blue}","\\color{Blue}{}"],["\\color{Yellow}{Yellow}","\\color{Yellow}{}"],["\\color{Cyan}{Cyan}","\\color{Cyan}{}"],["\\color{Magenta}{Magenta}","\\color{Magenta}{}"],["\\color{Teal}{Teal}","\\color{Teal}{}"],["\\color{Purple}{Purple}","\\color{Purple}{}"],["\\color{DarkBlue}{DarkBlue}","\\color{DarkBlue}{}"],["\\color{DarkRed}{DarkRed}","\\color{DarkRed}{}"],["\\color{Orange}{Orange}","\\color{Orange}{}"],["\\color{DarkOrange}{DarkOrange}","\\color{DarkOrange}{}"],["\\color{Golden}{Golden}","\\color{Golden}{}"],["\\color{Pink}{Pink}","\\color{Pink}{}"],["\\color{DarkGreen}{DarkGreen}","\\color{DarkGreen}{}"],["\\color{Orchid}{Orchid}","\\color{Orchid}{}"],["\\color{Emerald}{Emerald}","\\color{Emerald}{}"]],"big-op":[["{x}^{a}","{}^{}"],["{x}_{a}","{}_{}"],["{x}_{a}^{b}","{}_{}^{}"],["{{x}_{a}}^{b}","{{}_{}}^{}"],["_{a}^{b}\\textrm{C}","_{}^{}\\textrm{}"],["\\frac{a}{b}","\\frac{}{}"],["x\\tfrac{d}{c}","\\tfrac{}{}"],["\\int_{a}^{b}","\\int_{}^{}"],["\\oint_{a}^{b}","\\oint_{}^{}"],["\\iint_{a}^{b}","\\iint_{}^{}"],["\\bigcap_{a}^{b}","\\bigcap_{}^{}"],["\\bigcup_{a}^{b}","\\bigcup_{}^{}"],["\\lim_{x \\to 0}","\\lim_{}"],["\\sum_{a}^{b}","\\sum_{}^{}"],["\\sqrt[n]{x}","\\sqrt[]{}"],["\\prod_{a}^{b}","\\prod_{}^{}"],["\\coprod_{a}^{b}","\\coprod_{}^{}"]],"mid-op":["\\pm ","\\mp ","\\times ","\\ast ","\\div ","\\cap ","\\cup ","\\cdot ","\\Cap ","\\Cup ","\\uplus ","\\sqcap ","\\sqcup ","\\bigsqcup ","\\wedge ","\\vee ","\\barwedge ","\\veebar ","\\bigtriangleup ","\\bigtriangledown ","\\triangleleft ","\\triangleright ","\\setminus ","\\dotplus ","\\amalg ","\\dagger ","\\ddagger ","\\wr ","\\star ","\\bigstar ","\\lozenge ","\\blacklozenge ","\\circ ","\\bullet ","\\bigcirc ","\\square ","\\blacksquare ","\\triangle ","\\triangledown ","\\blacktriangle ","\\blacktriangledown ","\\bigoplus ","\\bigotimes ","\\bigodot ","\\diamond ","\\ominus ","\\oplus ","\\circledcirc ","\\oslash ","\\otimes ","\\circledast ","\\circleddash ","\\odot"],"bf-op":["\\because ","\\therefore ","\\cdots ","\\ddots ","\\vdots ","\\S ","\\partial ","\\mathbb{P}","\\mathbb{N}","\\imath ","\\jmath ","\\mathbb{Z}","\\angle ","\\measuredangle ","\\sphericalangle ","\\Re ","\\mathbb{I}","\\Im ","\\mathbb{Q}","\\mathbb{R}","\\forall ","\\exists ","\\varnothing ","\\infty ","\\mho ","\\wp ","\\mathbb{C}","\\top "],"cmp":["< ","> ","\\leq ","\\geq ","\\leqslant ","\\geqslant ","\\nless ","\\ngtr ","\\nleqslant ","\\ngeqslant ","= ","\\doteq ","\\equiv ","\\neq ","\\not\\equiv ","\\prec ","\\succ ","\\preceq ","\\succeq ","\\ll ","\\gg ","\\sim ","\\approx ","\\simeq ","\\cong ","\\vdash ","\\dashv ","\\smile ","\\frown ","\\models ","\\perp ","\\mid ","\\parallel ","\\asymp ","\\propto ","\\bowtie ","\\Join","\\sqsubset ","\\sqsupset ","\\sqsubseteq ","\\sqsupseteq ","\\subset ","\\supset ","\\subseteq ","\\supseteq ","\\nsubseteq ","\\nsupseteq ","\\subseteqq ","\\supseteqq ","\\nsubseteq ","\\nsupseteqq ","\\in ","\\ni ","\\notin "],"bracket":["( )","[ ]","\\{ \\}","| |","\\| \\|","\\langle  \\rangle ","\\lfloor  \\rfloor ","\\lceil  \\rceil "],"space":[["H\\, O\\, J","\\, "],["H\\: O\\: J","\\: "],["H\\; O\\; J","\\; "],["H\\! O\\! J","\\! "]],"symbol":["\\alpha ","\\beta ","\\gamma ","\\delta ","\\epsilon ","\\varepsilon ","\\zeta ","\\eta ","\\theta ","\\vartheta ","\\iota ","\\kappa ","\\lambda ","\\mu ","\\nu ","\\xi ","\\pi ","\\varpi ","\\rho ","\\varrho ","\\sigma ","\\varsigma ","\\tau ","\\upsilon ","\\phi ","\\varphi ","\\chi ","\\psi ","\\omega ","\\Gamma ","\\Delta ","\\Theta ","\\Lambda ","\\Xi ","\\Pi ","\\Sigma ","\\Upsilon ","\\Phi ","\\Psi ","\\Omega ","\\$ "],"sup":[["{a}' ","{}' "],["{a}'' ","{}'' "],["\\dot{a}","\\dot{}"],["\\ddot{a}","\\ddot{}"],["\\hat{a}","\\hat{}"],["\\check{a}","\\check{}"],["\\grave{a}","\\grave{}"],["\\acute{a}","\\acute{}"],["\\tilde{a}","\\tilde{}"],["\\breve{a}","\\breve{}"],["\\bar{a}","\\bar{}"],["\\vec{a}","\\vec{}"],["\\not{a}","\\not{}"],["{a}^{\\circ}","{}^{\\circ}"],["\\widetilde{abc}","\\widetilde{}"],["\\widehat{abc}","\\widehat{}"],["\\overleftarrow{abc}","\\overleftarrow{}"],["\\overrightarrow{abc}","\\overrightarrow{}"],["\\overline{abc}","\\overline{}"],["\\underline{abc}","\\underline{}"],["\\overbrace{abc}","\\overbrace{}"],["\\underbrace{abc}","\\underbrace{}"],["\\overset{a}{abc}","\\overset{}{}"],["\\underset{a}{abc}","\\underset{}{}"]],"arrow":["\\mapsto ","\\to ","\\leftarrow ","\\rightarrow ","\\Leftarrow ","\\Rightarrow ","\\leftrightarrow ","\\Leftrightarrow ","\\leftharpoonup ","\\rightharpoonup ","\\leftharpoondown ","\\rightharpoondown ","\\leftrightharpoons ","\\rightleftharpoons ",["\\xleftarrow[text]{long}","\\xleftarrow[]{}"],["\\xrightarrow[text]{long}","\\xrightarrow[]{}"]],"func":["\\sin ","\\cos ","\\tan ","\\csc ","\\sec ","\\cot ","\\sinh ","\\cosh ","\\tanh ","\\coth ","\\arcsin ","\\arccos ","\\arctan ","\\textrm{arccsc}","\\textrm{arcsec}","\\textrm{arccot}","\\sin^{-1}","\\cos^{-1}","\\tan^{-1}","\\sinh^{-1}","\\cosh^{-1}","\\tanh^{-1}","\\exp ","\\lg ","\\ln ","\\log ","\\log_{e}","\\log_{10}","\\lim ","\\liminf ","\\limsup ","\\max ","\\min ","\\infty ","\\arg ","\\det ","\\dim ","\\gcd ","\\hom ","\\ker ","\\Pr ","\\sup "],"multi":[["\\begin{matrix}\nH & O & J\\\\ \nH & O & J\n\\end{matrix}","\\begin{matrix}\n &  & \\\\ \n &  & \n\\end{matrix}"],["\\begin{bmatrix}\nH & O & J\\\\ \nH & O & J\n\\end{bmatrix}","\\begin{bmatrix}\n &  & \\\\ \n &  & \n\\end{bmatrix}"],["\\begin{pmatrix}\nH & O & J\\\\ \nH & O & J\n\\end{pmatrix}","\\begin{pmatrix}\n &  & \\\\ \n &  & \n\\end{pmatrix}"],["\\bigl(\\begin{smallmatrix}\nH & O & J\\\\ \nH & O & J\n\\end{smallmatrix}\\bigr)","\\bigl(\\begin{smallmatrix}\n &  & \\\\ \n &  & \n\\end{smallmatrix}\\bigr)"],["\\begin{vmatrix}\nH & O & J\\\\ \nH & O & J\n\\end{vmatrix}","\\begin{vmatrix}\n &  & \\\\ \n &  & \n\\end{vmatrix}"],["\\begin{Bmatrix}\nH & O & J\\\\ \nH & O & J\n\\end{Bmatrix}","\\begin{Bmatrix}\n &  & \\\\ \n &  & \n\\end{Bmatrix}"],["\\begin{Vmatrix}\nH & O & J\\\\ \nH & O & J\n\\end{Vmatrix}","\\begin{Vmatrix}\n &  & \\\\ \n &  & \n\\end{Vmatrix}"],["\\left\\{\\begin{matrix}\nH & O & J\\\\ \nH & O & J\n\\end{matrix}\\right.","\\left\\{\\begin{matrix}\n &  & \\\\ \n &  & \n\\end{matrix}\\right."],["\\left.\\begin{matrix}\nH & O & J\\\\ \nH & O & J\n\\end{matrix}\\right\\}","\\left.\\begin{matrix}\n &  & \\\\ \n &  & \n\\end{matrix}\\right\\}"],["\\left.\\begin{matrix}\nH & O & J\\\\ \nH & O & J\n\\end{matrix}\\right|","\\left.\\begin{matrix}\n &  & \\\\ \n &  & \n\\end{matrix}\\right|"],["\\binom{n}{r}","\\binom{}{}"],["\\begin{cases}\nHorseOJ & \\text{ if } name=mid \\\\ \nHOJ & \\text{ if } name=short \n\\end{cases}","\\begin{cases}\n & \\text{ if } x= \\\\ \n & \\text{ if } x= \n\\end{cases}"],["\\begin{align*}\n1+1 &= 2\\\\ \n2 &= 2\n\\end{align*}","\\begin{align*}\n &= \\\\ \n &= \n\\end{align*}"]]};
	
$(document).ready(function() {
	$.each(maths,function(id, content){
		$.each(content,function(curid, cur){
			var obj = $('<a></a>');
			obj.addClass('select-math');
			if($.isArray(cur)){
				obj.attr('onclick','add(' + JSON.stringify([cur[1]]) + ')');
				obj.attr('title',cur[0]);
				obj.text('$$' + cur[0] + '$$');
			}else{
				obj.attr('onclick','add(' + JSON.stringify([cur]) + ')');
				obj.attr('title',cur);
				obj.text('$$' + cur + '$$');
			}
			$('#tab-' + id).append(obj);
		});
	});
});

$(document).ready(function() {
	$('#button-math-editor').click(function() {
		$('#div-math-editor').toggle('fast');
	});
});