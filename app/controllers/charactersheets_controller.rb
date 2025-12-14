class CharactersheetsController < ApplicationController
  before_action :set_charactersheet, only: %i[ show edit update destroy ]

  # GET /charactersheets or /charactersheets.json
  def index
    @charactersheets = Charactersheet.all
  end

  # GET /charactersheets/1 or /charactersheets/1.json
  def show
  end

  # GET /charactersheets/new
  def new
    @charactersheet = Charactersheet.new
  end

  # GET /charactersheets/1/edit
  def edit
  end

  # POST /charactersheets or /charactersheets.json
  def create
    @charactersheet = Charactersheet.new(charactersheet_params)

    respond_to do |format|
      if @charactersheet.save
        format.html { redirect_to @charactersheet, notice: "Charactersheet was successfully created." }
        format.json { render :show, status: :created, location: @charactersheet }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @charactersheet.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /charactersheets/1 or /charactersheets/1.json
  def update
    respond_to do |format|
      if @charactersheet.update(charactersheet_params)
        format.html { redirect_to @charactersheet, notice: "Charactersheet was successfully updated." }
        format.json { render :show, status: :ok, location: @charactersheet }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @charactersheet.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /charactersheets/1 or /charactersheets/1.json
  def destroy
    @charactersheet.destroy!

    respond_to do |format|
      format.html { redirect_to charactersheets_path, status: :see_other, notice: "Charactersheet was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_charactersheet
      @charactersheet = Charactersheet.find(params.expect(:id))
    end

    # Only allow a list of trusted parameters through.
    def charactersheet_params
      params.expect(charactersheet: [ :name ])
    end
end
