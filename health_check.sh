#!/bin/bash
curl -s localhost:3000/health || echo Service unavailable
