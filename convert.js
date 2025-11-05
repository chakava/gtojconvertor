const jalaali = require('jalaali-js');

module.exports = (req, res) => {
  const { date } = req.query;
  
  if (!date) {
    return res.status(400).json({ 
      error: 'Missing date parameter. Use format: ?date=YYYY-MM-DD' 
    });
  }
  
  try {
    const [year, month, day] = date.split('-').map(Number);
    
    if (!year || !month || !day) {
      throw new Error('Invalid date format');
    }
    
    const jDate = jalaali.toJalaali(year, month, day);
    
    res.json({
      jy: jDate.jy,
      jm: jDate.jm,
      jd: jDate.jd
    });
    
  } catch (error) {
    res.status(400).json({ 
      error: 'Invalid date format. Use YYYY-MM-DD format' 
    });
  }
};
