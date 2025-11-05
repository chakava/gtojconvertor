const jalaali = require('jalaali-js');

module.exports = (req, res) => {
  // Set CORS headers to allow requests from your WordPress site
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
    
    if (dateParts.length !== 3) {
      throw new Error('Invalid date format');
    }
    
    const [year, month, day] = dateParts.map(Number);
    
    // Validate date components
    if (!year || !month || !day || isNaN(year) || isNaN(month) || isNaN(day)) {
      throw new Error('Invalid date components');
    }
    
    if (month < 1 || month > 12 || day < 1 || day > 31) {
      throw new Error('Invalid month or day');
    }
    
    // Convert to Jalaali
    const jDate = jalaali.toJalaali(year, month, day);
    
    
  const jDate = { jy:jDate.jy, jm: jDate.jm, jd: jDate.jd };

return res
  .status(200)
  .type('text')
  .send(`${jDate.jy}/${String(jDate.jm).padStart(2, '0')}/${String(jDate.jd).padStart(2, '0')}`);

  
    
  } catch (error) {
    return res.status(400).json({ 
      error: 'Invalid date format',
      message: 'Please use YYYY-MM-DD format (e.g., 2025-11-05)',
      details: error.message
    });
  }
};
