#!/bin/sh -x

touch public
find public/ -mindepth 1 -exec touch {} \;
tar cz -C public/ . | ssh dal.byteporter.com 'tar xz -C /opt/docker/vvc-website/html'
