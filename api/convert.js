import jalaali from 'jalaali-js';

export default function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  const { date } = req.query;

  if (!date) {
    res.status(400).json({
      error: 'Missing date parameter',
      usage: 'Use format: ?date=YYYY-MM-DD',
      example: '?date=2025-11-05'
    });
    return;
  }

  try {
    const parts = date.split('-');
    if (parts.length !== 3) throw new Error('Invalid format');

    const [year, month, day] = parts.map(Number);
    if (isNaN(year) || isNaN(month) || isNaN(day))
      throw new Error('Invalid components');

    const jDate = jalaali.toJalaali(year, month, day);
    const formatted = `${jDate.jy}/${String(jDate.jm).padStart(2, '0')}/${String(jDate.jd).padStart(2, '0')}`;

    // Send plain text output
    res.status(200).send(formatted);

  } catch (err) {
    res.status(400).json({
      error: 'Invalid date format',
      message: 'Please use YYYY-MM-DD format (e.g., 2025-11-05)',
      details: err.message
    });
  }
}
