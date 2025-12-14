json.extract! charactersheet, :id, :name, :created_at, :updated_at
json.url charactersheet_url(charactersheet, format: :json)
