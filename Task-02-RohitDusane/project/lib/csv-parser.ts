export interface ParsedCSV {
  columns: string[];
  data: Record<string, string | number | null>[];
  rowCount: number;
  errors: string[];
}

export function parseCSV(text: string): ParsedCSV {
  const errors: string[] = [];
  const lines = text.trim().split(/\r?\n/);

  if (lines.length < 2) {
    return { columns: [], data: [], rowCount: 0, errors: ['CSV must have a header row and at least one data row'] };
  }

  const parseRow = (line: string): string[] => {
    const result: string[] = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        if (inQuotes && line[i + 1] === '"') {
          current += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === ',' && !inQuotes) {
        result.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    result.push(current.trim());
    return result;
  };

  const columns = parseRow(lines[0]);
  const data: Record<string, string | number | null>[] = [];

  for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue;

    const values = parseRow(lines[i]);
    if (values.length !== columns.length) {
      errors.push(`Row ${i}: Expected ${columns.length} columns, got ${values.length}`);
      continue;
    }

    const row: Record<string, string | number | null> = {};
    columns.forEach((col, idx) => {
      const val = values[idx];
      if (val === '' || val === null || val === undefined) {
        row[col] = null;
      } else if (!isNaN(Number(val)) && val !== '') {
        row[col] = Number(val);
      } else {
        row[col] = val;
      }
    });
    data.push(row);
  }

  return { columns, data, rowCount: data.length, errors };
}

export function detectTextColumn(columns: string[]): string | null {
  const textPatterns = ['text', 'content', 'message', 'review', 'comment', 'description', 'body', 'tweet', 'email', 'subject', 'title', 'feedback', 'body_text', 'article'];
  const lower = columns.map(c => c.toLowerCase());

  for (const pattern of textPatterns) {
    const idx = lower.findIndex(c => c.includes(pattern));
    if (idx !== -1) return columns[idx];
  }

  for (let i = 0; i < columns.length; i++) {
    const col = columns[i].toLowerCase();
    if (!['id', 'date', 'time', 'timestamp', 'year', 'month', 'day', 'label', 'class', 'category', 'target', 'score', 'rating', 'sentiment'].some(skip => col.includes(skip))) {
      return columns[i];
    }
  }

  return columns[0];
}

export function detectLabelColumn(columns: string[]): string | null {
  const labelPatterns = ['label', 'class', 'category', 'target', 'sentiment', 'rating', 'type', 'topic', 'outcome'];
  const lower = columns.map(c => c.toLowerCase());

  for (const pattern of labelPatterns) {
    const idx = lower.findIndex(c => c === pattern || c.endsWith(`_${pattern}`) || c.endsWith(`${pattern}`));
    if (idx !== -1) return columns[idx];
  }

  return null;
}

export function validateColumns(data: Record<string, string | number | null>[], textCol: string): { valid: number; empty: number } {
  let valid = 0;
  let empty = 0;

  data.forEach(row => {
    const val = row[textCol];
    if (val === null || val === undefined || String(val).trim() === '') {
      empty++;
    } else {
      valid++;
    }
  });

  return { valid, empty };
}
