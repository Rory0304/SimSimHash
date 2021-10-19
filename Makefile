#Set the variable
TARGET := $(TARGET)

build:
	@echo "build $(TARGET)"
	@docker-compose -f docker-compose2.yml build -- $(TARGET)

run:
	@echo "run $(TARGET)"
	@docker-compose -f docker-compose2.yml up -d -- $(TARGET)

all:
	@docker-compose -f docker-compose2.yml up -d


