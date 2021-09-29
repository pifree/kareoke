//* ---------------------------------------- Logging ----------------------------------------------------
const fs = require('fs');
const chalk = require('chalk')
const { log } = console
//* ------------------------------------------ Cache sistemi --------------------------------------------
const NodeCache = require('node-cache')
const cache = new NodeCache()
//* --------------------------------------- Request -----------------------------------------------------
const expressListEndpoints = require('express-list-endpoints')
const userScheme = require('../database/schemes/user')
//* --------------------------------------- Search ------------------------------------------------------

/**
 * Distance search algoritması, eğer obje değeri verilirse obje döndürür
 * @param {Array} arr Bakılacak değerler dizesi 
 * @param {any} inputvalue Aranacak değer, türü bakılacak değerler ile aynı olmalı
 * @param {object} objects Eğer girilir ise döndürülecek sonuç, aran dizesindeki bulunan index sırasındaki obje olacaktır 
*/
function distanceSearch(arr, inputvalue, objects) {
    let closestOne;
    let floorDistance = 0.1;
  
    for (let i = 0; i < arr.length; i++) {
      let dist = distance(arr[i], inputvalue);
      if (dist > floorDistance) {
        floorDistance = dist;
        if (objects){
          closestOne = objects[i]
          continue
        }
        closestOne = arr[i];
      }
    }
  
    return closestOne;
  }
    
  function distance(val1, val2) {
    let longer, shorter, longerlth, result;
  
    if (val1.length > val2.length) {
      longer = val1;
      shorter = val2;
    } else {
      longer = val2;
      shorter = val1;
    }
  
    longerlth = longer.length;
  
    result = ((longerlth - editDistance(longer, shorter)) / parseFloat(longerlth));
  
    return result;
  }
  
  function editDistance(val1, val2) {
    val1 = val1.toString().toLowerCase();
    val2 = val2.toString().toLowerCase();
  
    let costs = [];
  
    for(let i = 0; i <= val1.length; i++) {
      let lastVal = i;
      for(let j = 0; j <= val2.length; j++) {
          if (i === 0) {
          costs[j] = j;
        } else if (j > 0) {
          let newVal = costs[j - 1];
          if (val1.charAt(i - 1) !== val2.charAt(j - 1)) {
            newVal = Math.min(Math.min(newVal, lastVal), costs[j]) + 1;
          }
          costs[j - 1] = lastVal;
          lastVal = newVal;
        }
      }
      if (i > 0) { costs[val2.length] = lastVal }
    }
  
    return costs[val2.length];
  }
//* ------------------------------------------ Cache sistemi ---------------------------------------------

const cacheResponse = duration => (req, res, next) => {
  if (req.method != 'GET') {
    return next()
  }

  const key = req.originalUrl
  const cachedResponse = cache.get(key)

  if (cachedResponse) {
    res.send(cachedResponse)
  } else {
    res.originalSend = res.send
    res.send = body => {
      res.originalSend(body)
      cache.set(key, body, duration)
    }
    next()
  }
}
//* ---------------------------------------- Logging ---------------------------------------------------

function error(err) {
  log(chalk.red(err))
  fs.writeFileSync(`./log/error/error-${Date.now()}.txt`, err.toString(), { flag: 'a' })
}

function info(info) {
  log(chalk.yellow(info))
  fs.writeFileSync(`./log/info/info-${Date.now()}.txt`, info.toString(), { flag: 'a' })
}
//* --------------------------------------- Request -----------------------------------------------------
const request = app => async (req, res, next) => {
  const endpoints = expressListEndpoints(app)
  const request = { 'path': req._parsedUrl.pathname, 'method': req.method, 'auth': req.header("Authorization") }

  if (request.path.includes('/auth/')) return next()
  else if (!request.auth) return res.status(400).send({msg: 'Request header doesn\'t have \'Authorization\' information'})
  else {
    const user = await userScheme.findOne({ 'keys._id': request.auth })
    if (!user) return res.status(401).send({msg: 'API key you entered is not valid'})
  }

  var flag = 0
  for (let i = 0; i < endpoints.length; i++) {
    if (request.path == endpoints[i].path) {
      flag = 1
      for (let l = 0; l < endpoints[i].methods.length; l++) {
        if (request.method == endpoints[i].methods[l]) {
          flag = 2
          break
        }
      }
      break
    }
  }
  switch (flag) {
    case 0:
      res.status(404).send({msg: 'The URI requested is not valid'})
      break
    case 1:
      res.status(405).send({msg: 'The URI method is not valid'})
      break
    case 2:
      next()
      break
  }
}

module.exports = {distanceSearch, cacheResponse, error, info, request}
