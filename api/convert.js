const jalaali = require('jalaali-js');

module.exports = (req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  const { date } = req.query;

  if (!date) {
    return res.status(400).json({ 
      error: 'Missing date parameter',
      usage: 'Use format: ?date=YYYY-MM-DD',
      example: '?date=2025-11-05'
    });
  }

  try {
    const dateParts = date.split('-');
    if (dateParts.length !== 3) throw new Error('Invalid date format');

    const [year, month, day] = dateParts.map(Number);

    // Validate numbers
    if (!year || !month || !day || isNaN(year) || isNaN(month) || isNaN(day)) {
      throw new Error('Invalid date components');
    }
    if (month < 1 || month > 12 || day < 1 || day > 31) {
      throw new Error('Invalid month or day');
    }

    // Convert to Jalaali
    const j = jalaali.toJalaali(year, month, day);

    // Return formatted plain text date
    return res
      .status(200)
      .type('text')
      .send(`${j.jy}/${String(j.jm).padStart(2, '0')}/${String(j.jd).padStart(2, '0')}`);

  } catch (error) {
    return res.status(400).json({ 
      error: 'Invalid date format',
      message: 'Please use YYYY-MM-DD format (e.g., 2025-11-05)',
      details: error.message
    });
  }
};
