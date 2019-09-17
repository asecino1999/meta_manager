#!/usr/bin/env bash
(echo 'var ip = "'$( ip -4 addr show eth0 | grep -oP '(?<=inet\s)\d+(\.\d+){3}')'";'  && echo "module.exports=ip;"  ) > src/ip.js
