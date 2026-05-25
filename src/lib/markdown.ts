// Minimal Markdown → HTML renderer tuned for GitHub release notes and the
// project's CHANGELOG.md. Covers headings, lists, fenced code, inline code,
// links, bold/italic, and bare URLs. Not a general-purpose Markdown engine —
// anything more elaborate (tables, footnotes, blockquotes) falls through as
// readable text.

function escapeHtml(s: string): string {
	return s
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#39;');
}

function renderInline(s: string): string {
	let out = escapeHtml(s);
	out = out.replace(/`([^`]+)`/g, '<code>$1</code>');
	out = out.replace(
		/\[([^\]]+)\]\((https?:[^)]+)\)/g,
		'<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>',
	);
	out = out.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
	out = out.replace(/(^|[^*])\*([^*]+)\*/g, '$1<em>$2</em>');
	out = out.replace(
		/(?<!["=>])(https?:\/\/[^\s<)]+)/g,
		'<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>',
	);
	return out;
}

export type RenderOptions = {
	// Headings in source are shifted down by this many levels so that an h1 in
	// the source becomes an h(1+shift) in the output. Useful when embedding a
	// document under an existing page title (h1).
	headingShift?: number;
};

export function renderMarkdown(md: string | null | undefined, opts: RenderOptions = {}): string {
	if (!md || !md.trim()) return '<p><em>No content.</em></p>';
	const shift = opts.headingShift ?? 0;
	const lines = md.replace(/\r\n/g, '\n').split('\n');
	const html: string[] = [];
	let inList = false;
	let inCode = false;
	let codeBuf: string[] = [];
	const closeList = () => {
		if (inList) {
			html.push('</ul>');
			inList = false;
		}
	};
	for (const raw of lines) {
		const line = raw.trimEnd();
		if (line.startsWith('```')) {
			if (inCode) {
				html.push(`<pre><code>${escapeHtml(codeBuf.join('\n'))}</code></pre>`);
				codeBuf = [];
				inCode = false;
			} else {
				closeList();
				inCode = true;
			}
			continue;
		}
		if (inCode) {
			codeBuf.push(raw);
			continue;
		}
		const heading = line.match(/^(#{1,6})\s+(.*)$/);
		if (heading) {
			closeList();
			const level = Math.min(Math.max(heading[1].length + shift, 1), 6);
			html.push(`<h${level}>${renderInline(heading[2])}</h${level}>`);
			continue;
		}
		const listItem = line.match(/^\s*[-*]\s+(.*)$/);
		if (listItem) {
			if (!inList) {
				html.push('<ul>');
				inList = true;
			}
			html.push(`<li>${renderInline(listItem[1])}</li>`);
			continue;
		}
		if (!line.trim()) {
			closeList();
			continue;
		}
		closeList();
		html.push(`<p>${renderInline(line)}</p>`);
	}
	closeList();
	if (inCode) html.push(`<pre><code>${escapeHtml(codeBuf.join('\n'))}</code></pre>`);
	return html.join('\n');
}
