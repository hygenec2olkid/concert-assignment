up:
	docker compose up -d --build db
	# docker compose up -d --build nextjs

down:	
	docker compose down -v