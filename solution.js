function truncate(input, n)
{
	return (input.length <= n) ? input : truncateWithEllipsis(input, n);
}

function truncateWithEllipsis(input, n)
{	
	var virtualElement = document.createElement("div");
	virtualElement.innerHTML = input;
	
	var output = "";
	var childNr = 0;
	var node;
	while (node = virtualElement.childNodes[childNr++])
	{
		if (node.outerHTML != undefined)
		{
			if (node.outerHTML.length <= n - 3)
			{
				output += node.outerHTML;
				n -= node.outerHTML.length;
			}
			else
			{
				var content = node.innerHTML;
				node.innerHTML = "";
				var endTag = "</" + node.nodeName.toLowerCase() + ">";
				var startTag = node.outerHTML.replace(endTag, "");
				var tagsLength = endTag.length + startTag.length;
				return output + ((tagsLength <= n - 3) ? startTag + truncateWithEllipsis(content, n - tagsLength) + endTag : "..."); 
			}
		}
		else
		{
			if (node.nodeValue.length <= n - 3) 
			{
				output += node.nodeValue;
				n -= node.nodeValue.length;
			}
			else
			{
				var el = node.nodeValue.substring(0, n - 3);
				return output + (node.nodeValue[n-3] == " " ? el : el.substring(0, el.lastIndexOf(" "))) + "...";
			}
		}
	}
	return output;
}

function parse()
{
	var result = truncate(document.getElementById('input').value, document.getElementById('n-value').value);
	document.getElementById('output-length').innerHTML = result.length;
	document.getElementById('output').innerHTML = result;
	document.getElementById('output-html').innerHTML = result;
}